import React, { useRef } from "react";
import {
  Typography,
  Modal,
} from "@material-ui/core";
import styles from "./Modal.module.css";

const InviteModal = ({ showModal, modalHandler, roomId }) => {
  const link = window.location.host + "/joinRoom?id=" + roomId;
  const codeRef = useRef(null);
  const linkRef = useRef(null);

  // const copyCodeToClipboard = (e) => {
  //   codeRef.current.select();
  //   document.execCommand('copy');
  //   e.target.focus();
  // }

  // const copyLinkToClipboard = (e) => {
  //   linkRef.current.select();
  //   document.execCommand('copy');
  //   e.target.focus();
  // }

  return (
  <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
    <div className={styles.appModal}>
      <Typography className={styles.title}>
        To invite users to the room they can use the code:
      </Typography>
      <Typography ref={codeRef}>{roomId}</Typography>
      {/* {
        document.queryCommandSupported('copy') &&
          <Button onClick={copyCodeToClipboard}>Copy</Button>
      } */}
      <Typography className={styles.title}>
        Or use the link:
      </Typography>
      <Typography ref={linkRef}>{link}</Typography>
      {/* {
        document.queryCommandSupported('copy') &&
          <Button onClick={copyLinkToClipboard}>Copy</Button>
      } */}
    </div>
  </Modal>
  );
};

export default InviteModal;
