import React from "react";
import styles from "./MainPage.module.css";
import { Button, Typography, Grid } from "@material-ui/core";
import CreateJoinRoomButton from "../components/CreateJoinRooms";
import Header from "../common/Header";

const MainPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.MainPage}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant='h1'>
              In-Sync
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CreateJoinRoomButton />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
