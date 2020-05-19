import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Login from "../components/LoginComponent";
import * as qs from "query-string";
import SignUp from "../components/SignUpComponent";
import styles from "./LoginPage.module.css";
import Header from "../common/Header";

const JoinRoomPage = () => {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const roomId = qs.parse(window.location.search).id;
  const roomUrl = "/video?id=" + roomId;
  console.log(roomUrl);

  return (
    <>
      {
        loggedIn ? 
        <Redirect to={roomUrl} />
        : <div>
            <Header />
            <div className={styles.LoginPage}>
              Please log in to navigate to the room
              <Grid container spacing={0}>
                <Grid item xs={2} />
                <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                  <Login />
                </Grid>
                <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                  <SignUp />
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </div>
          </div>
      }
    </>
  )
};

export default JoinRoomPage;
