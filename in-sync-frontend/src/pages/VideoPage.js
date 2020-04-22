import React from "react";
import { Typography, Grid } from '@material-ui/core';
import EmbeddedVideo from "../components/EmbeddedVideo";
import "./VideoPage.css";
import ChatUserSwitch from "../components/ChatUserSwitch";

class VideoPage extends React.Component {
  render() {
    return (
      <div className="VideoPage">
        <Typography variant='h1'>
          In-Sync
        </Typography>

        <Grid container spacing={0}>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <EmbeddedVideo url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
          </Grid>
          <Grid item xs={4}>
            <ChatUserSwitch />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

export default VideoPage;
