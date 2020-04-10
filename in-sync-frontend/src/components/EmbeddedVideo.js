import React from 'react';
import ReactPlayer from "react-player";

class EmbeddedVideo extends React.Component {
    render() {
        return (
            <div className="App">
                <ReactPlayer url={this.props.url} />
            </div>
        );
    }
}

export default EmbeddedVideo;
