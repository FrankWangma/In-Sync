import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "./Modal.css";

const AddVideoModal = ({ showModal, modalHandler }) => {
  const [url, setVideoURL] = useState("");
  const [search, setSearchInput] = useState("");

  return (
    <Modal open={showModal} onBackdropClick={() => { modalHandler(false); }}>
      <div className={"addVideoModal"}>
        <Grid container spacing={0}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Typography variant="h2" className={"title"}>
              Add a video
            </Typography>
            <Typography>Video URL</Typography>
            <TextField
              className={"addVideoText"}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoURL"
              value={url}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              onChange={(e) => { setVideoURL(e.target.value); }}
            />
            <Typography>Search for a video</Typography>
            <TextField
              className={"addVideoText"}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              name="videoSearch"
              value={search}
              onChange={(e) => { setSearchInput(e.target.value); }}
            />
            <div className={"modalButtons"}>
              <Button className={"cancelButton"} onClick={() => { modalHandler(false); }}>
                Cancel
              </Button>
              <Button className={"createButton"} onClick={() => { modalHandler(false); }}>
                Add
              </Button>
            </div>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={4}>
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Search for a video" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Searched/found videos will show up in a list here" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </div>
    </Modal>
  );
};

export default AddVideoModal;