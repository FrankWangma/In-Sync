import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import styles from "./Modal.module.css";
import VideoList from './VideoList'
import axios from 'axios';

const AddVideoModal = ({ showModal, modalHandler, handleVideoChange }) => {
  const [url, setVideoURL] = useState("");
  const [search, setSearchInput] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const KEY = process.env.YOUTUBE_KEY || "API KEY NOT VALID LOCALLY";

  const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      part: 'snippet',
      maxResults: 5,
      key: KEY,
    }
  })

  const checkYoutubeUrl = (input) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    return re.test(input);
  }

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
      setVideos(response.data.items);
    })
  }

  const handleVideoSelect = (video) => {
    const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    handleVideoChange(url);
    modalHandler(false)
  }

  const handleChangeKey = (e) => {
    if (keyPress(e) && url) {
      changeVideos();
    }
  }

  const handleSearchKey = (e) => {
    if (keyPress(e) && search) {
      handleSearchSubmit();
    }
  }

  const changeVideos = () => {
    if (checkYoutubeUrl(url)) {
      handleVideoChange(url);
      setError(false);
      setHelperText('');
      setVideoURL('');
      modalHandler(false);
    } else {
      setError(true);
      setHelperText('Please enter a valid YouTube URL');
    }
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      return true;
    }
    return false;
  }

  return (
    <Dialog
      open={showModal}
      onBackdropClick={() => {
        modalHandler(false);
        setError(false);
        setHelperText('');
        setVideoURL('');
      }}
      scroll='paper'
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Change the video</DialogTitle>
      <DialogContent className={styles.changeVideoModal} dividers={true}>
        <Grid container spacing={0}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Typography>Video URL</Typography>
            <TextField
              error={error}
              helperText={helperText}
              className={styles.addVideoText}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoURL"
              value={url}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              onChange={(e) => { setVideoURL(e.target.value); }}
              onKeyDown={handleChangeKey}
            />
            <Typography>Search for a video</Typography>
            <TextField
              className={styles.addVideoText}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoSearch"
              value={search}
              onChange={(e) => { setSearchInput(e.target.value); }}
              onKeyDown={handleSearchKey}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <Typography variant="h6">
              Top 5 Videos Found
            </Typography>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
          Cancel
        </Button>
        <Button variant="contained" className={styles.changeButton} disabled={!url} onClick={changeVideos}>
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
