import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Modal,
} from "@material-ui/core";
import styles from "./Modal.module.css";
import VideoList from './VideoList'
import axios from 'axios';

const AddVideoModal = ({ showModal, modalHandler, handleVideoChange }) => {
  const [url, setVideoURL] = useState("");
  const [search, setSearchInput] = useState("");
  const [videos, setVideos] = useState([]);
  const KEY = 'AIzaSyD962bLlUbUCSBNbbwudKk1Ha0NwWSORoY';

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
        q: search
      }
    }).then((response) => setVideos(response.data.items))
  }

  const handleVideoSelect = (video) => {
    const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    handleVideoChange(url);
    modalHandler(false);
  }

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.addVideoModal}>
        <Grid container spacing={0}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Typography variant="h2" className={styles.title}>
              Add a video
            </Typography>
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
            <div className={styles.modalButtons}>
              <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
                Cancel
              </Button>
              <Button className={styles.createButton} onClick={() => { handleVideoChange(url); modalHandler(false); }}>
                Add
              </Button>
              <Button className={styles.createButton} onClick={handleSearchSubmit}>
                Search
              </Button>
            </div>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={4}>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </div>
    </Modal>
  );
};

export default AddVideoModal;
