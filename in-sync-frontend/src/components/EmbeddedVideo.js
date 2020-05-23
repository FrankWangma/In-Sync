import React, { useRef } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import screenfull from 'screenfull';
import Button from '@material-ui/core/Button';
import { Fullscreen, VolumeUp, PlayArrow, Pause } from '@material-ui/icons';
import Slider from '@material-ui/core/Slider';

const EmbeddedVideo = (props) => {

    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(50);
    const [played, setPlayed] = React.useState(0);
    const [seeking, setSeeking] = React.useState(false);

    const ref = useRef();

    const handlePlay = () => {
        setPlaying(true);
        props.playVideo(this.state.played);
    }

    const handlePause = () => {
        setPlaying(false);
        props.pauseVideo(this.state.played);
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    const handleSeekMouseDown = _e => {
        setSeeking(true);
    }

    const handleSeekChange = (_e, v) => {
        ref.current.seekTo(v * 2);
        setPlayed(v);
    }

    const handleSeekMouseUp = (e, v) => {
        setSeeking(false);
    }

    const handleVolumeChange = (_e, v) => {
        setVolume(v);
    }

    const handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            setPlayed(state.played);
        }
    }

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(ref.current));
    }

    return (
        <div className="App EmbeddedVideo">
            <ReactPlayer
                url={props.url}
                ref={ref}
                playing={playing}
                volume={volume / 100}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
                onProgress={handleProgress}
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
}

export default EmbeddedVideo;
