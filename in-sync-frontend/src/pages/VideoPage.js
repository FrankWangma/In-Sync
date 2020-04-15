import React from "react";
import EmbeddedVideo from "../components/EmbeddedVideo";
import "./VideoPage.css";

class VideoPage extends React.Component {
  render() {
    return (
      <div className="VideoPage">
        <p>Video Page Placeholder</p>
        <EmbeddedVideo url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
      </div>
    );
  }
}

export default VideoPage;
