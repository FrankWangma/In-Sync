import React, { useRef, useState } from "react";
import {
  Typography,
  Modal,
  Button,
} from "@material-ui/core";
import styles from "./Modal.module.css";
import { Redirect } from "react-router-dom";

const HostLeftModal = ({ hostLeft }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
  <Modal open={hostLeft}>
  <div className={styles.appModal}>
    <Typography className={styles.title}>
    The host has left the room, please continue to the home page
    </Typography>
    <Button onClick={setRedirect(true)}>
    Continue
    </Button>
  </div>
  </Modal>
  );
};

export default HostLeftModal;
