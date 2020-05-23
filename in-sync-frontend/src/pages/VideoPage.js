import React, { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as qs from "query-string";
import axios from "axios";
import EmbeddedVideo from "../components/EmbeddedVideo";
import AddVideoModal from "../components/AddVideoModal";
import InviteModal from "../components/InviteModal";
import styles from "./VideoPage.module.css";
import ChatUserSwitch from "../components/ChatUserSwitch";
import Header from "../common/Header";
import socket from "../socket/socket"

const VideoPage = () => {
  const [showAddVideoModal, changeAddVideoModal] = useState(false);
  const [showInviteModal, changeInviteModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [users, setUsers] = useState({
    host: "",
    viewers: []
  });
  const [receivedMessage, setReceivedMessage] = useState([]);

  const roomId = qs.parse(window.location.search).id;
  const user = useSelector((state) => state.authentication.user);
  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    socket.on('connect', () => {
      const joinData = {
        roomId: roomId,
        username: user.username
      }
      socket.emit('join', joinData)
    });
  
    socket.on('userJoinedRoom', (data) => {
    });
  
    socket.on('newMessage', (data) => {
      setReceivedMessage(data);
    });

    socket.on('playVideo', (data) => {
      console.log(data);
    })

    socket.on('pauseVideo', (data) => {
      console.log(data);
    })

    axios.put("http://localhost:3000/room", {
      crossdomain: true,
      userId: user.id,
      username: user.username,
      id: roomID,
    }, {
      headers: { Authorization: `Bearer ${token}`}
    }).then((response) => {
        setVideoUrl(response.data.video)
          setUsers({
            host: response.data.host,
            viewers: response.data.viewers,
          })
      })
  }, [roomId, user.username]);

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
  
  return (
    <>
      <Header />
      <div className={styles.VideoPage}>
        <Typography variant='h1'>
          In-Sync
        </Typography>
        <Grid container spacing={0}>
          <Grid item sm={12} md={1} />
          <Grid item sm={12} md={6}>
            <EmbeddedVideo url={videoUrl} playVideo={playVideo} pauseVideo={pauseVideo}/>
            <Button variant="contained" color="primary" className={"addVideoButton"} onClick={() => { changeAddVideoModal(true); }}>
              Add Video
            </Button>
            <Button variant="contained" color="primary" className={"addVideoButton"} onClick={() => { changeInviteModal(true); }}>
              Invite Users
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatUserSwitch sendMessage={sendMessage} users={users} receivedMessage={receivedMessage} currentUser={user.username}/>
          </Grid>
          <Grid item sm={12} md={1} />
        </Grid>
        <AddVideoModal showModal={showAddVideoModal} modalHandler={changeAddVideoModal} />
        <InviteModal showModal={showInviteModal} modalHandler={changeInviteModal} roomId={roomId} />
      </div>
    </>
  );
};

export default VideoPage;
