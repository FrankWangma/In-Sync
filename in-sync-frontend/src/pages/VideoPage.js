import React from 'react';
import EmbeddedVideo from "../components/EmbeddedVideo";

class VideoPage extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Video Page Placeholder</p>
                    <EmbeddedVideo url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
                </header>
            </div>
        );
    }
}

export default VideoPage;
