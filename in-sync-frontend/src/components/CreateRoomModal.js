import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Modal.module.css";

const CreateRoomModal = ({ showModal, modalHandler }) => {
  const [title, setRoomTitle] = useState("");
  const [url, setURL] = useState("");

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.appModal}>
        <Typography variant="h2" className={styles.title}>
          Create Room
        </Typography>
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
          <Link to={`/video`}>
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
