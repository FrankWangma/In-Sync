import React from "react";
import styles from "./VideoItem.module.css";

const VideoItem = ({ video, handleVideoSelect }) => (
        <div className={styles.item} onClick={ () => handleVideoSelect(video)}>
            <img src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.description}/>
            <div>
                <div>{video.snippet.title}</div>
            </div>
        </div>
);

export default VideoItem;
