import React, { useState } from "react";
import EmbeddedVideo from "../components/EmbeddedVideo";
import "./VideoPage.css";
import ChatComponent from "../components/ChatComponent";
import { Typography, Grid, Button } from '@material-ui/core';
import AddVideoModal from "../components/AddVideoModal";

const VideoPage = () => {
  const [showAddVideoModal, changeAddVideoModal] = useState(false);

  return (
    <>
      <div className="VideoPage">
        <Typography variant='h1'>
          In-Sync
        </Typography>
        <Grid container spacing={0}>
          <Grid item sm={12} md={1} />
          <Grid item sm={12} md={6}>
            <EmbeddedVideo url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
            <Button variant="contained" color="primary" className={'addVideoButton'} onClick={() => {changeAddVideoModal(true)}}>
              Add Video
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatComponent className="chat" />
          </Grid>
          <Grid item sm={12} md={1} />
        </Grid>
        <AddVideoModal showModal={showAddVideoModal} modalHandler={changeAddVideoModal} />
      </div>
    </>
  );
}

export default VideoPage;
