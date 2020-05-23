import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Modal,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import styles from "./Modal.module.css";
import VideoList from './VideoList'
import axios from 'axios';
import config from '../config.json'

const AddVideoModal = ({ showModal, modalHandler, handleVideoChange }) => {
  const [url, setVideoURL] = useState("");
  const [search, setSearchInput] = useState("");
  const [videos, setVideos] = useState([]);
  const KEY = process.env.YOUTUBE_KEY || config.YoutubeAPIKey;

  const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      part: 'snippet',
      maxResults: 5,
      key: KEY,
    }
  })


  const handleSearchSubmit = () => {
    youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
        type: 'video',
        q: search
      }
    }).then((response) => {
      console.log(response);
      setVideos(response.data.items);})
  }

  const handleVideoSelect = (video) => {
    const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    handleVideoChange(url);
    modalHandler(false);
  }

  return (
    <Dialog 
    open={showModal} 
    onBackdropClick={() => { modalHandler(false); }} 
    scroll='paper'
    fullWidth={true}
    maxWidth={'lg'}
    >
      <DialogTitle>Change the video</DialogTitle>
      <DialogContent dividers={true}>
        <Grid container spacing={0}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Typography>Video URL</Typography>
            <TextField
              className={styles.addVideoText}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoURL"
              value={url}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              onChange={(e) => { setVideoURL(e.target.value); }}
            />
            <Typography>Search for a video</Typography>
            <TextField
              className={styles.addVideoText}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoSearch"
              value={search}
              onChange={(e) => { setSearchInput(e.target.value); }}
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={4}>
            <Typography variant="h6">
              Top 5 Videos Found
            </Typography>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
          Cancel
        </Button>
        <Button variant="contained" className={styles.changeButton} disabled={!url} onClick={() => { handleVideoChange(url); modalHandler(false); }}>
          Change
        </Button>
        <Button variant="contained" disabled={!search} onClick={handleSearchSubmit}>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVideoModal;
