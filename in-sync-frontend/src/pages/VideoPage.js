import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import EmbeddedVideo from "../components/EmbeddedVideo";
import AddVideoModal from "../components/AddVideoModal";
import "./VideoPage.css";
import ChatUserSwitch from "../components/ChatUserSwitch";

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
