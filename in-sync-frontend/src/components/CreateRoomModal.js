import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Modal.module.css";

const CreateRoomModal = ({ showModal, modalHandler }) => {
  const [title, setRoomTitle] = useState("");
  const [url, setURL] = useState("");
  const [roomId, setRoomId] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const user =  useSelector((state) => state.authentication.user);
  const token = useSelector((state) => state.authentication.token);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  const createRoom = () => {
    if (loggedIn) {
      axios.post("http://localhost:3000/room", {
          crossdomain: true,
          host: user.username,
          video: url,
          viewers: [],
        }, {
          headers: { Authorization: `Bearer ${token}`}
        }
      ).then((res) => setRoomId(`/video?id=${res.data._id}`))
        .then(setShouldNavigate(true));
    }
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
        {loggedIn ? <></> : <Typography className={styles.warningText}>Please log in to create a room</Typography> }
        <Typography>Room Title</Typography>
        <TextField
          className={styles.bodyText}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          name="title"
          value={title}
          onChange={(e) => { setRoomTitle(e.target.value); }}
        />
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
            <Button disabled={!loggedIn} className={styles.createButton}>
              Create
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
