import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as qs from "query-string";
import axios from "axios";
import { useHistory } from "react-router-dom";
import EmbeddedVideo from "../../components/EmbeddedVideo/EmbeddedVideo";
import AddVideoModal from "../../components/Modals/AddVideoModal";
import HostLeftModal from "../../components/Modals/HostLeftModal";
import InviteModal from "../../components/Modals/InviteModal";
import styles from "./VideoPage.module.css";
import ChatUserSwitch from "../../components/ChatUserSwitch/ChatUserSwitch";
import Header from "../../common/Header";
import socket from "../../socket/socket";

const VideoPage = () => {
  const [showAddVideoModal, changeAddVideoModal] = useState(false);
  const [showInviteModal, changeInviteModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [userJoined, setUserJoined] = useState(false);
  const [hostLeft, setHostLeft] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [users, setUsers] = useState({
    host: "",
    viewers: [],
  });
  const [receivedMessage, setReceivedMessage] = useState([]);
  const history = useHistory();

  const roomId = qs.parse(window.location.search).id;
  const user = useSelector((state) => state.authentication.user);
  const token = useSelector((state) => state.authentication.token);

  // If hosting frontend locally, use local backend too
  const url = window.location.host;
  let baseURL = "";
  if (url.includes("localhost")) {
    baseURL = "http://localhost:5000";
  } else {
    baseURL = "https://in-sync-app-backend.herokuapp.com";
  }

  const removeDuplicates = (array) => {
    const unique = {};
    array.forEach((i) => {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  };

  const handleHostLeaving = () => {
    socket.emit("leaveRoom");
    setHostLeft(true);
  };

  useEffect(() => {
    let mounted = true;
    const joinData = {
      roomId,
      username: user.username,
    };
    socket.emit("join", joinData);

    const handleUserLeaving = (data) => {
      // eslint-disable-next-line no-shadow
      const url = `${baseURL}/room`;
      axios.get(`${url}${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        /* After getting the updated room, remove the list and
        update the room again with the new list */
        // eslint-disable-next-line array-callback-return, consistent-return
        let newViewersList = response.data.viewers.filter((value) => {
          if (value !== data) {
            return value;
          }
        });
        newViewersList = removeDuplicates(newViewersList);
        setUsers({
          host: response.data.host,
          viewers: newViewersList,
        });
        axios.put(url, {
          crossdomain: true,
          id: roomId,
          userId: user.id,
          username: data,
          remove: true,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      });
    };

    socket.on("userJoinedRoom", () => {
      setUserJoined(true);
    });

    socket.on("newMessage", (data) => {
      setReceivedMessage(data);
    });

    socket.on("playVideo", (data) => {
      setPlayTime(data);
    });

    socket.on("pauseVideo", (data) => {
      setPauseTime(data);
    });

    socket.on("changeVideo", (data) => {
      setVideoUrl(data.video);
    });

    socket.on("userLeft", (data) => {
      handleUserLeaving(data);
    });

    socket.on("hostLeft", () => {
      handleHostLeaving();
    });

    axios.put(`${baseURL}/room`, {
      crossdomain: true,
      userId: user.id,
      username: user.username,
      id: roomId,
      remove: false,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (mounted) {
        setVideoUrl(response.data.video);
        setUsers({
          host: response.data.host,
          viewers: response.data.viewers,
        });
      }
    }).catch(() => {
      history.push("/");
    });

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, [roomId, user.username, history, baseURL, user.id, token]);

  useEffect(() => {
    // Get Video ID
    // eslint-disable-next-line no-shadow
    const url = `${baseURL}/room/${roomId}`;
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setVideoUrl(response.data.video);
      });
  }, [roomId, videoUrl, baseURL, token]);

  const sendMessage = (message) => {
    const data = {
      roomId,
      message,
      username: user.username,
    };
    socket.emit("message", data);
  };

  const pauseVideo = (time) => {
    const data = {
      roomId,
      time,
      username: user.username,
    };
    socket.emit("pause", data);
  };

  const playVideo = (time) => {
    const data = {
      roomId,
      time,
      username: user.username,
    };
    socket.emit("play", data);
  };

  const changeVideo = (newUrl) => {
    // eslint-disable-next-line no-shadow
    const url = `${baseURL}/room/${roomId}`;
    axios.put(url, {
      video: newUrl,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setVideoUrl(response.data.video);
      const data = {
        roomId,
        url: newUrl,
        username: user.username,
      };
      socket.emit("change", data);
    });
  };

  useEffect(() => {
    const handleUserJoined = () => {
      // eslint-disable-next-line no-shadow
      const url = `${baseURL}/room/${roomId}`;
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setUsers({
          host: response.data.host,
          viewers: response.data.viewers,
        });
      });
    };

    let mounted = true;
    if (mounted && userJoined) {
      handleUserJoined();
    }
    return () => {
      mounted = false;
      setUserJoined(false);
    };
  }, [userJoined, baseURL, roomId, token]);

  return (
    <>
      <Header />
      <div className={styles.VideoPage}>
        <Grid container spacing={0}>
          <Grid item sm={12} md={8}>
            <EmbeddedVideo pauseTime={pauseTime} playTime={playTime} url={videoUrl}
              playVideo={playVideo} pauseVideo={pauseVideo} />
            <div className={styles.changeInviteButton}>
              {user.username === users.host ? <Button variant="contained" color="primary"
                className={"addVideoButton"} onClick={() => { changeAddVideoModal(true); }}>Change Video</Button> : <div />}
              <Button variant="contained" color="primary" className={"addVideoButton"}
                onClick={() => { changeInviteModal(true); }}>
                Invite Users
            </Button>
            </div>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatUserSwitch sendMessage={sendMessage}
              users={users} receivedMessage={receivedMessage} currentUser={user.username} />
          </Grid>
        </Grid>
        <AddVideoModal showModal={showAddVideoModal}
          modalHandler={changeAddVideoModal} handleVideoChange={changeVideo} />
        <InviteModal showModal={showInviteModal} modalHandler={changeInviteModal} roomId={roomId} />
      </div>
      <HostLeftModal showModal={hostLeft} />
    </>
  );
};

export default VideoPage;
