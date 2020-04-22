import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import styles from "./CreateJoinRooms.module.css";
import CreateRoomModal from "./CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal";

const CreateJoinRoomButton = () => {
  const [showCreateRoomModal, changeCreateModal] = useState(false);
  const [showJoinRoomModal, changeJoinModal] = useState(false);

  return (
  <>
    <Grid container spacing={0}>
    <Grid item xs={12} className={styles.containedButton}>
      <Button variant="contained" className={styles.button} onClick={() => { changeJoinModal(true); }}>
      <Grid item xs={6}>
        <Typography variant={"h5"}>
        Join Room
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant={"subtitle1"}>
        Join an existing In-Sync room
        </Typography>
      </Grid>
      </Button>
    </Grid>
    <Grid item xs={12} className={styles.containedButton}>
      <Button variant="contained" className={styles.button} onClick={() => { changeCreateModal(true); }}>
      <Grid item xs={6}>
        <Typography variant={"h5"}>
        Create Room
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant={"subtitle1"}>
        Create a new In-Sync room
        </Typography>
      </Grid>
      </Button>
    </Grid>
    </Grid>
    <CreateRoomModal showModal={showCreateRoomModal} modalHandler={changeCreateModal}/>
    <JoinRoomModal showModal={showJoinRoomModal} modalHandler={changeJoinModal}/>
  </>
  );
};

export default CreateJoinRoomButton;
