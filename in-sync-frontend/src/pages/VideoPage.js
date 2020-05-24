import React, { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as qs from "query-string";
import axios from "axios";
import EmbeddedVideo from "../components/EmbeddedVideo";
import AddVideoModal from "../components/AddVideoModal";
import HostLeftModal from "../components/HostLeftModal";
import InviteModal from "../components/InviteModal";
import styles from "./VideoPage.module.css";
import ChatUserSwitch from "../components/ChatUserSwitch";
import Header from "../common/Header";
import socket from "../socket/socket"

const VideoPage = () => {
  const [showAddVideoModal, changeAddVideoModal] = useState(false);
  const [showInviteModal, changeInviteModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [userJoined, setUserJoined] = useState(false);
  const [hostLeft, setHostLeft] = useState(false);
  const [users, setUsers] = useState({
    host: "",
    viewers: []
  });
  const [receivedMessage, setReceivedMessage] = useState([]);

  const roomId = qs.parse(window.location.search).id;
  const user = useSelector((state) => state.authentication.user);
  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    let mounted = true;
    const joinData = {
      roomId: roomId,
      username: user.username
    }
    socket.emit('join', joinData)
  
    socket.on('userJoinedRoom', (data) => {
      setUserJoined(true);
    });
  
    socket.on('newMessage', (data) => {
      setReceivedMessage(data);
    });

    socket.on('playVideo', (data) => {
      console.log(data);
    });

    socket.on('pauseVideo', (data) => {
      console.log(data);
    })
    
    socket.on('changeVideo', (data) => {
      setVideoUrl(data.video);
    });

    socket.on('userLeft', (data) => {
      handleUserLeaving(data);
    })

    socket.on('hostLeft', (data) => {
      console.log('host has left');
      handleHostLeaving();
    })

    axios.put("http://localhost:3000/room", {
      crossdomain: true,
      userId: user.id,
      username: user.username,
      id: roomId,
      remove: false
    }, {
      headers: { Authorization: `Bearer ${token}`}
    }).then((response) => {
      if(mounted) {
          setVideoUrl(response.data.video)
            setUsers({
              host: response.data.host,
              viewers: response.data.viewers,
            })
        }
      })

      return () => mounted = false;
  }, [roomId, user.username]);

  useEffect(() => {
    // Get Video ID
    const url = `http://localhost:3000/room/${roomId}`;
    axios.get(url,{
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => {
        setVideoUrl(response.data.video);
      });
  }, [roomId, videoUrl]);

  const sendMessage = (message) => {
    const data = {
      roomId: roomId,
      message: message,
      username: user.username
    };
    socket.emit('message', data);
  }

  const pauseVideo = (time) => {
    const data = {
      roomId: roomId,
      time: time,
      username: user.username
    };
    socket.emit('pause', data);
  }

  const playVideo = (time) => {
    const data = {
      roomId: roomId,
      time: time,
      username: user.username
    };
    socket.emit('play', data);
  }

  const handleHostLeaving = () => {
    socket.emit('leaveRoom');
    console.log("updated");
    setHostLeft(true);
  }
  
  const changeVideo = (newUrl) => {
      const url = `http://localhost:3000/room/${roomId}`;
      axios.put(url, {
        video: newUrl
      }, {
        headers: { Authorization: `Bearer ${token}`}
      }).then((response) => {
        setVideoUrl(response.data.video);
        const data = {
          roomId: roomId,
          url: newUrl,
          username: user.username
        };
        socket.emit('change', data);
      });
  }

  const handleUserLeaving = (data) => {
    const url = "http://localhost:3000/room/"
    axios.get(`${url}${roomId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then((response) => {
      // After getting the updated room, remove the list and update the room again with the new list
      let newViewersList = response.data.viewers.filter((value) => {
        if(value !== data) {
          return value;
        }
      })
      newViewersList = removeDuplicates(newViewersList);
      setUsers({
        host: response.data.host,
        viewers: newViewersList
      })
      axios.put(url, {
        crossdomain: true,
        id: roomId,
        userId: user.id,
        username: data,
        remove: true
      }, {
        headers: { Authorization: `Bearer ${token}`}
      })
    })
  }

  const removeDuplicates = (array) => {
    let unique = {};
    array.forEach((i) => {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  const handleUserJoined = () => {
    const url = `http://localhost:3000/room/${roomId}`
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}`}
    }).then((response) => {
      setUsers({
        host: response.data.host,
        viewers: response.data.viewers
      })
    })
      
  }

  useEffect(() => {
    let mounted = true;
    if(mounted && userJoined) {
      handleUserJoined();
    }
    return () => {
      mounted = false;
      setUserJoined(false);
    }
  }, [userJoined])
  
  return (
    <>
      <Header />
      <div className={styles.VideoPage}>
        <Grid container spacing={0}>
          <Grid item sm={12} md={8}>
            <EmbeddedVideo url={videoUrl} playVideo={playVideo} pauseVideo={pauseVideo}/>
            <Button variant="contained" color="primary" className={"addVideoButton"} onClick={() => { changeAddVideoModal(true); }}>
              Change Video
            </Button>
            <Button variant="contained" color="primary" className={"addVideoButton"} onClick={() => { changeInviteModal(true); }}>
              Invite Users
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatUserSwitch sendMessage={sendMessage} users={users} receivedMessage={receivedMessage} currentUser={user.username}/>
          </Grid>
        </Grid>
        <AddVideoModal showModal={showAddVideoModal} modalHandler={changeAddVideoModal} handleVideoChange={changeVideo}/>
        <InviteModal showModal={showInviteModal} modalHandler={changeInviteModal} roomId={roomId} />
      </div>
      <HostLeftModal showModal={hostLeft}/>
    </>
  );
};

export default VideoPage;
