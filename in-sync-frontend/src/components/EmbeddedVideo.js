import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import screenfull from 'screenfull';
import Button from '@material-ui/core/Button';
import { Fullscreen, VolumeUp, PlayArrow, Pause } from '@material-ui/icons';
import Slider from '@material-ui/core/Slider';

const EmbeddedVideo = (props) => {

    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(0.5);
    const [played, setPlayed] = React.useState(0);

    // const ref = player => {
    //     this.player = player
    // }

    const handlePlay = () => {
        setPlaying(true);
    }

    const handlePause = () => {
        setPlaying(false);
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    const handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    const handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    const handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    const handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    const handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    return (
        <div className="App EmbeddedVideo">
            <ReactPlayer
                url={props.url}
                // ref={ref}
                playing={playing}
                volume={volume}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
                onProgress={handleProgress}
            />

            {/* Video Player Controls */}
            <Grid container spacing={0}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={handlePlayPause}>{playing ? <Pause /> : <PlayArrow />}</Button>
                </Grid>
                <Grid item xs={10}>
                    <input
                        type='range' min={0} max={0.999999} step='any'
                        className='seek'
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={handleClickFullscreen}><Fullscreen /></Button>
                </Grid>
                <Grid item xs={1}>
                    <p className='volume'><VolumeUp /></p>
                </Grid>
                <Grid item xs={3}>
                    <Slider min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" />
                    {/* <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.handleVolumeChange} /> */}
                </Grid>
            </Grid>
        </div>
    );
}

export default EmbeddedVideo;
