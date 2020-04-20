import React from "react";
import {
  Button, TextField, Typography, Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./CreateRoomModal.css";

class CreateRoomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
    };
    this.setRoomTitle = this.setRoomTitle.bind(this);
    this.setURL = this.setURL.bind(this);
  }

  setRoomTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  setURL(e) {
    this.setState({
      url: e.target.value,
    });
  }

  render() {
    return (
            <Modal open={this.props.showModal}>
                <div className={"appModal"}>
                    <Typography variant="h2" className={"title"}>
                        Create Room
                    </Typography>
                    <Typography>Room Title</Typography>
                    <TextField
                        className={"bodyText"}
                        margin="normal"
                        name="title"
                        value={this.state.title}
                        onChange={this.setRoomTitle}
                    />
                    <Typography>Video URL</Typography>
                    <TextField
                        className={"bodyText"}
                        margin="normal"
                        name="url"
                        value={this.state.url}
                        onChange={this.setURL}
                    />
                    <div className={"modalButtons"}>
                        <Button className={"cancelButton"} onClick={this.props.onClose}>
                            Cancel
                        </Button>
                        <Link to={`/video`}>
                            <Button className={"createButton"}>
                                Create
                            </Button>
                        </Link>
                    </div>
                </div>
            </Modal>
    );
  }
}

export default CreateRoomModal;
