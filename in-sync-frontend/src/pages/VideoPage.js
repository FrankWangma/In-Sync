import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import * as qs from "query-string";
import axios from "axios";
import EmbeddedVideo from "../components/EmbeddedVideo";
import AddVideoModal from "../components/AddVideoModal";
import styles from "./VideoPage.module.css";
import ChatUserSwitch from "../components/ChatUserSwitch";
import Header from "../common/Header";

const VideoPage = () => {
  const [showAddVideoModal, changeAddVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const roomId = qs.parse(window.location.search).id;
  // Get Video ID
  const url = `http://localhost:3000/room/${roomId}`;
  axios.get(url)
    .then((response) => setVideoUrl(response.data.video));

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
            <EmbeddedVideo url={videoUrl} />
            <Button variant="contained" color="primary" className={"addVideoButton"} onClick={() => { changeAddVideoModal(true); }}>
              Add Video
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatUserSwitch />
          </Grid>
          <Grid item sm={12} md={1} />
        </Grid>
        <AddVideoModal showModal={showAddVideoModal} modalHandler={changeAddVideoModal} />
      </div>
    </>
  );
};

export default VideoPage;
