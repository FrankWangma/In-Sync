import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Login from "../components/LoginComponent";
import * as qs from "query-string";
import SignUp from "../components/SignUpComponent";
import styles from "./LoginPage.module.css";
import Header from "../common/Header";
import axios from "axios";

const JoinRoomPage = () => {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const roomId = qs.parse(window.location.search).id;
  const roomUrl = "/video?id=" + roomId;
  const [navigateToRoom, setNavigateToRoom] = useState(false);
  console.log(roomUrl);

  const user =  useSelector((state) => state.authentication.user)

  if (navigateToRoom) {
    return <Redirect to={roomUrl} />;
  }

  if (loggedIn) {
    axios.put("http://localhost:3000/room", {
      crossdomain: true,
      userId: user.id,
      username: user.username,
      id: roomId,
    })
    .then(setNavigateToRoom(true));
  }

  return (
    <div>
      <Header />
      <div className={styles.LoginPage}>
        Please log in to navigate to the room
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
