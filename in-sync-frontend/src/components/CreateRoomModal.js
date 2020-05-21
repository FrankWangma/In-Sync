import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "./Modal.module.css";

const CreateRoomModal = ({ showModal, modalHandler }) => {
  const [url, setURL] = useState("");
  const [roomId, setRoomId] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const createRoom = () => {
    axios.post("http://localhost:3000/room", {
      crossdomain: true,
      host: "5ea8de31f4d4b92ac44db792", // PLACEHOLDER
      video: url,
      viewers: [],
    })
      .then((res) => setRoomId(`/video?id=${res.data._id}`))
      .then(setShouldNavigate(true));
  };

  if (shouldNavigate) {
    return <Redirect to={roomId} />;
  }

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.appModal}>
        <Typography variant="h2" className={styles.title}>
          Create Room
        </Typography>
        <Typography>Video URL</Typography>
        <TextField
          className={styles.bodyText}
          margin="normal"
          name="url"
          value={url}
          onChange={(e) => { setURL(e.target.value); }}
        />
        <div className={styles.modalButtons}>
          <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
            Cancel
          </Button>
          <Link to={roomId} onClick={() => { createRoom(); }}>
            <Button className={styles.createButton}>
              Create
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
