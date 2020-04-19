import React from "react";
import { Typography, Grid } from "@material-ui/core";
import "./MainPage.css";
import CreateJoinRoomButton from "../components/CreateJoinRooms";


class MainPage extends React.Component {
  render() {
    return (
        <div className="MainPage">
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
    );
  }
}

export default MainPage;
