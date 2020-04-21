import React from "react";
import EmbeddedVideo from "../components/EmbeddedVideo";
import styles from "./VideoPage.module.css";
import ChatComponent from "../components/ChatComponent";
import { Typography, Grid } from '@material-ui/core';

class VideoPage extends React.Component {
  render() {
    return (
      <div className={styles.VideoPage}>
        <Typography variant='h1'>
          In-Sync
        </Typography>

        <Grid container spacing={0}>
          <Grid item sm={12} md={1} />
          <Grid item sm={12} md={6}>
            <EmbeddedVideo url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatComponent className={styles.chat} />
          </Grid>
          <Grid item sm={12} md={1} />
        </Grid>
      </div>
    );
  }
}

export default VideoPage;
