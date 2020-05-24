import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Modal.module.css";

const JoinRoomModal = ({ showModal, modalHandler }) => {
  const [roomID, setRoomID] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [shouldNavigateToRoom, setShouldNavigateToRoom] = useState(false);
  const [shouldNavigateToLogin, setShouldNavigateToLogin] = useState(false);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  const joinRoom = () => {
    if (loggedIn) {
      setRoomUrl(`/video?id=${roomID}`);
      setShouldNavigateToRoom(true);
    } else {
      setShouldNavigateToLogin(true);
    }
  };

  if (shouldNavigateToRoom) {
    return <Redirect to={roomUrl} />;
  }

  if (shouldNavigateToLogin) {
    return <Redirect to={`/joinRoom?id=${roomID}`} />;
  }

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.appModal}>
        <Typography variant="h2" className={styles.title}>
          Join Room
    </Typography>
        <Typography>Enter Room ID</Typography>
        <TextField
          className={styles.bodyText}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          name="ID"
          value={roomID}
          placeholder="e.g. SD23F5G"
          onChange={(e) => { setRoomID(e.target.value); }}
        />
        <div className={styles.modalButtons}>
          <Button className={styles.cancelButton} onClick={() => { modalHandler(false); }}>
            Cancel
          </Button>
          <Button onClick={() => { joinRoom() }} className={styles.createButton}>
            Join
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default JoinRoomModal;
