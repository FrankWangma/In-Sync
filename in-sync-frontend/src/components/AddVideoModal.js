import React, { useState } from 'react';
import { Button, TextField, Typography, Modal, ListItemText } from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Modal.css';

const AddVideoModal = ({showModal, modalHandler}) => {
    const [url, setVideoURL] = useState('');
    const [search, setSearchInput] = useState('');

    return (
        <Modal open={showModal} onBackdropClick={() => {modalHandler(false)}}>
            <div className={"appModal"}>
                <Grid container spacing={0}>
                    <Grid item xs={1} />
                    <Grid item xs={5}>
                        <Typography variant="h2" className={"title"}>
                            Add a video
                        </Typography>
                        <Typography>Video URL</Typography>
                        <TextField
                            className={"bodyText"}
                            InputProps={{ disableUnderline: true }}
                            margin="normal"
                            name="videoURL"
                            value={url}
                            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            onChange={(e) => {setVideoURL(e.target.value)}}
                        />
                        <Typography>Search for a video</Typography>
                        <TextField
                            className={"bodyText"}
                            InputProps={{ disableUnderline: true }}
                            margin="normal"
                            name="videoSearch"
                            value={search}
                            onChange={(e) => {setSearchInput(e.target.value)}}
                        />
                        <div className={"modalButtons"}>
                            <Button className={"cancelButton"} onClick={() => {modalHandler(false)}}>
                                Cancel
                            </Button>
                            <Link to={`/video`}>
                                <Button className={"createButton"}>
                                    Join
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemText primary="Search for a video" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>

                <Typography variant="h2" className={"title"}>
                    Join Room
                </Typography>
                <Typography>Enter Room ID or URL</Typography>
                <TextField
                    className={"bodyText"}
                    InputProps={{ disableUnderline: true }}
                    margin="normal"
                    name="ID"
                    value={roomID}
                    placeholder="e.g. SD23F5G or insync.com/SD23F5G"
                    onChange={setRoomID}
                />
                <div className={"modalButtons"}>
                    <Button className={"cancelButton"} onClick={() => {modalHandler(false)}}>
                        Cancel
                    </Button>
                    <Link to={`/video`}>
                        <Button className={"createButton"}>
                            Join
                        </Button>
                    </Link>
                </div>
            </div>
        </Modal>
    )
};

export default AddVideoModal;