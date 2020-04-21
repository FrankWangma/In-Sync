import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import "./MainPage.css";
import { Link } from "react-router-dom";
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
                <Grid item sm={12} m={4}>
                    <Link to={"/login"}>
                        <Button variant="contained"
                        size="large" color="primary">
                        Log In
                        </Button>
                    </Link>
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
