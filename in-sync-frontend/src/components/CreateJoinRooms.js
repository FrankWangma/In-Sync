import React from "react";
import styles from "./CreateJoinRooms.module.css";
import { Button, Grid, Typography } from "@material-ui/core";
import CreateRoomModal from "./CreateRoomModal";

class CreateJoinRoomButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showCreateRoomModal: false };
        this.createRoom = this.createRoom.bind(this);
        this.cancelCreateRoom = this.cancelCreateRoom.bind(this);
    }

    createRoom() {
        this.setState({
            showCreateRoomModal: true
        });
    }

    cancelCreateRoom() {
        this.setState({
            showCreateRoomModal: false
        });
    }
    
    render() {
        return (
            <>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={styles.containedButton}>
                        <Button variant="contained" className={styles.button}>
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
                        <Button variant="contained" className={styles.button} onClick={this.createRoom}>
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
                <CreateRoomModal showModal={this.state.showCreateRoomModal} onClose={this.cancelCreateRoom}/>
            </>
        );
    }
}

export default CreateJoinRoomButton;
