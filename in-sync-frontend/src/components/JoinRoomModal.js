import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Modal.css";

const JoinRoomModal = ({ showModal, modalHandler }) => {
  const [roomID, setRoomID] = useState("");

  return (
  <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
    <div className={"appModal"}>
    <Typography variant="h2" className={"title"}>
      Join Room
    </Typography>
    <Typography>Enter Room ID or URL</Typography>
    <TextField
      className={"bodyText"}
      InputProps={{ disableUnderline: true }}
      margin="normal"
      name="ID"
      value={roomID}
      placeholder="e.g. SD23F5G or insync.com/SD23F5G"
      onChange={(e) => { setRoomID(e.target.value); }}
    />
    <div className={"modalButtons"}>
      <Button className={"cancelButton"} onClick={() => { modalHandler(false); }}>
      Cancel
      </Button>
      <Link to={`/video`}>
      <Button className={"createButton"}>
        Join
      </Button>
      </Link>
    </div>
    </div>
  </Modal>
  );
};

export default JoinRoomModal;
