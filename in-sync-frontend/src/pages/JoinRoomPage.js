import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Login from "../components/LoginComponent";
import * as qs from "query-string";
import SignUp from "../components/SignUpComponent";
import styles from "./JoinRoomPage.module.css";
import Header from "../common/Header";
import axios from "axios";

const JoinRoomPage = () => {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const alert = useSelector((state) => state.alert);
  const roomId = qs.parse(window.location.search).id;
  const roomUrl = "/video?id=" + roomId;
  const [navigateToRoom, setNavigateToRoom] = useState(false);

  const user =  useSelector((state) => state.authentication.user)
  const token = useSelector((state) => state.authentication.token);

  if (navigateToRoom) {
    return <Redirect to={roomUrl} />;
  }

  if (loggedIn) {
    axios.put("https://in-sync-app-backend.herokuapp.com/room", {
        crossdomain: true,
        userId: user.id,
        username: user.username,
        id: roomId,
      }, {
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    .then(setNavigateToRoom(true));
  }

  return (
    <div>
      <Header />
      <div className={styles.JoinRoomPage}>
        {alert.type === "alert-success" &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Typography className={styles.HeaderText}>
          Please log in to navigate to the room
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={2} />
          <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
            <Login joiningRoom={true} />
          </Grid>
          <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
            <SignUp />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </div>
  )
};

export default JoinRoomPage;
