import React from "react";
import EmbeddedVideo from "../components/EmbeddedVideo";
import "./VideoPage.css";
import ChatComponent from "../components/ChatComponent";
import { Typography, Grid, Button } from '@material-ui/core';

class VideoPage extends React.Component {
  render() {
    return (
      <div className="VideoPage">
        <Typography variant='h1'>
          In-Sync
        </Typography>

        <Grid container spacing={0}>
          <Grid item sm={12} md={1} />
          <Grid item sm={12} md={6}>
            <EmbeddedVideo url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
            <Button variant="contained" color="primary" className={'addVideoButton'}>
              Add Video
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <ChatComponent className="chat" />
          </Grid>
<<<<<<< HEAD
          <Grid item xs={1} />
          <Grid item xs={1} />
=======
          <Grid item sm={12} md={1} />
>>>>>>> master
        </Grid>
      </div>
    );
  }
}

export default VideoPage;
