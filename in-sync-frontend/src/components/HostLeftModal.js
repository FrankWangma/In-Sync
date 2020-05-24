import React, { useState } from "react";
import {
  Typography,
  Modal,
  Button,
} from "@material-ui/core";
import styles from "./Modal.module.css";
import { Redirect } from "react-router-dom";

const HostLeftModal = ({ showModal }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
  <Modal open={showModal}>
  <div className={styles.appModal}>
    <Typography className={styles.title}>
    The host has left the room, please continue to the home page
    </Typography>
    <Button className={styles.createButton} onClick={() => { setRedirect(true); }}>
      Continue
    </Button>
  </div>
  </Modal>
  );
};

export default HostLeftModal;
