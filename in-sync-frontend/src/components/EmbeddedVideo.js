import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import screenfull from 'screenfull';

class EmbeddedVideo extends React.Component {
    state = {
        playing: false,
        volume: 0.5,
        played: 0
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <div className="App">
                <ReactPlayer
                    url={this.props.url}
                    ref={this.ref}
                    playing={this.state.playing}
                    volume={this.state.volume}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onEnded={this.handlePause}
                    onProgress={this.handleProgress}
                />

                {/* Video Player Controls */}
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <button onClick={this.handlePlayPause}>{this.state.playing ? '\u23F8' : '\u25B6'}</button>
                    </Grid>
                    <Grid item xs={10}>
                        <input
                            type='range' min={0} max={0.999999} step='any'
                            className='seek'
                            value={this.state.played}
                            onMouseDown={this.handleSeekMouseDown}
                            onChange={this.handleSeekChange}
                            onMouseUp={this.handleSeekMouseUp}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <button onClick={this.handleClickFullscreen}>{'\u26F6'}</button>
                    </Grid>
                    <Grid item xs={1}>
                        <p className='volume'>{'\u{1F50A}'}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.handleVolumeChange} />
                    </Grid>
                </Grid>
            </div>
        );
    }

    handlePlay = () => {
        this.setState({ playing: true })
    }

    handlePause = () => {
        this.setState({ playing: false })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }
}

export default EmbeddedVideo;
