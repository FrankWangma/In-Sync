import React, { useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";
import screenfull from "screenfull";
import Button from "@material-ui/core/Button";
import {
  Fullscreen, VolumeUp, PlayArrow, Pause,
} from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";
import styles from "./EmbeddedVideo.module.css";

const EmbeddedVideo = (props) => {
  const targetRef = useRef();
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [played, setPlayed] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);

  const ref = useRef();

  useEffect(() => {
    setPlayed(props.playTime);
    ref.current.seekTo(props.playTime);
    setPlaying(true);
  }, [props.playTime]);

  useEffect(() => {
    setPlayed(props.pauseTime);
    ref.current.seekTo(props.pauseTime);
    setPlaying(false);
  }, [props.pauseTime]);

  const handlePlay = () => {
    setPlaying(true);
    props.playVideo(played);
  };

  const handlePause = () => {
    setPlaying(false);
    props.pauseVideo(played);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSeekMouseDown = (_e) => {
    setSeeking(true);
  };

  const handleSeekChange = (_e, v) => {
    setPlayed(v / 100);
    ref.current.seekTo(v / 100);
  };
  // eslint-disable-next-line no-unused-vars
  const handleSeekMouseUp = (e, v) => {
    setSeeking(false);
  };

  const handleVolumeChange = (_e, v) => {
    setVolume(v);
  };

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleClickFullscreen = () => {
    // eslint-disable-next-line react/no-find-dom-node
    screenfull.request(findDOMNode(ref.current));
  };

  const getVideoWidth = () => {
    try {
      return targetRef.current.offsetWidth / 2;
    } catch (e) {
      return "360px";
    }
  };


  return (
        <div ref={targetRef}>
            <ReactPlayer
                className={styles.player}
                url={props.url}
                ref={ref}
                playing={playing}
                volume={volume / 100}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
                onProgress={handleProgress}
                height={getVideoWidth()}
            />

            {/* Video Player Controls */}
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={handlePlayPause}>{playing ? <Pause /> : <PlayArrow />}</Button>
                </Grid>
                <Grid item xs={8}>
                    <Slider
                        value={played * 100}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        aria-labelledby="continuous-slider" />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={handleClickFullscreen}><Fullscreen /></Button>
                </Grid>
                <Grid item xs={2}>
                    <p className='volume'><VolumeUp /></p>
                </Grid>
                <Grid item xs={3}>
                    <Slider value={volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" />
                </Grid>
            </Grid>
        </div>
  );
};

export default EmbeddedVideo;
