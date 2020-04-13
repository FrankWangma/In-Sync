import React from "react";
import './CreateJoinRooms.css'
import { Button, Grid, Typography } from "@material-ui/core";

class CreateJoinRoomButton extends React.Component {
  render() {
    return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button variant="contained" className={"button"}>
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
                <Grid item xs={12}>
                    <Button variant="contained" className={"button"}>
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
    );
  }
}

export default CreateJoinRoomButton;
