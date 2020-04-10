import React from 'react';
import ReactPlayer from "react-player";

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
                />

                {/* Video Player Controls */}
                <button onClick={this.handlePlayPause}>{this.state.playing ? '\u23F8' : '\u25B6'}</button>

                <p>Seek</p>
                <input
                    type='range' min={0} max={0.999999} step='any'
                    value={this.state.played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                />

                <p>{'\u{1F50A}'}</p>
                <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.handleVolumeChange} />
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
}

export default EmbeddedVideo;
