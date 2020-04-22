import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Modal.css";
import styles from "./CreateRoomModal.module.css";

const CreateRoomModal = ({ showModal, modalHandler }) => {
  const [title, setRoomTitle] = useState("");
  const [url, setURL] = useState("");

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={"appModal"}>
        <Typography variant="h2" className={"title"}>
          Create Room
        </Typography>
        <Typography>Room Title</Typography>
        <TextField
          className={"bodyText"}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          name="title"
          value={title}
          onChange={(e) => { setRoomTitle(e.target.value); }}
        />
        <Typography>Video URL</Typography>
        <TextField
          className={"bodyText"}
          margin="normal"
          name="url"
          value={url}
          onChange={(e) => { setURL(e.target.value); }}
        />
        <div className={"modalButtons"}>
          <Button className={"cancelButton"} onClick={() => { modalHandler(false); }}>
            Cancel
          </Button>
          <Link to={`/video`}>
            <Button className={"createButton"}>
              Create
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
