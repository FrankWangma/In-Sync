import React, { useRef } from "react";
import {
  Typography,
  Modal,
  Button
} from "@material-ui/core";
import { FileCopy } from '@material-ui/icons';
import styles from "./Modal.module.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const InviteModal = ({ showModal, modalHandler, roomId }) => {
  const link = window.location.host + "/joinRoom?id=" + roomId;
  const codeRef = useRef(null);
  const linkRef = useRef(null);

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={styles.appModal}>
        <Typography className={styles.title}>
          To invite users to the room via the code or link:
        </Typography>
        <div>
          <Typography className={styles.copyText} ref={codeRef}>{roomId}</Typography>
          <CopyToClipboard className={styles.copyButton} text={roomId}>
            <Button><FileCopy /></Button>
          </CopyToClipboard>
        </div>

        <div>
          <Typography className={styles.copyText} ref={linkRef}>{link}</Typography>
          <CopyToClipboard className={styles.copyButton} text={link}>
            <Button><FileCopy /></Button>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
