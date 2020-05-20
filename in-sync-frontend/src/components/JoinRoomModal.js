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

const JoinRoomModal = ({ showModal, modalHandler }) => {
  const [roomID, setRoomID] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const user =  useSelector((state) => state.authentication.user)

  const joinRoom = () => {
    setRoomUrl(`/video?id=${roomID}`);
    axios.put("http://localhost:3000/room", {
      crossdomain: true,
      userId: user.id,
      username: user.username,
      id: roomID,
    })
      .then(setShouldNavigate(true));
  };

  if (shouldNavigate) {
    return <Redirect to={roomUrl} />;
  }

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.appModal}>
        <Typography variant="h2" className={styles.title}>
          Join Room
    </Typography>
        <Typography>Enter Room ID or URL</Typography>
        <TextField
          className={styles.bodyText}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          name="ID"
          value={roomID}
          placeholder="e.g. SD23F5G or insync.com/SD23F5G"
          onChange={(e) => { setRoomID(e.target.value); }}
        />
        <div className={styles.modalButtons}>
          <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
            Cancel
      </Button>
          <Link onClick={() => { joinRoom(); }}>
            <Button className={styles.createButton}>
              Join
      </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default JoinRoomModal;
