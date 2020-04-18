import React from 'react';
import { Button, TextField, Typography, Modal } from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Modal.css';

class JoinRoomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: '',
        };
        this.setRoomID = this.setRoomID.bind(this);
    }

    setRoomID(e) {
        this.setState({
            title: e.target.value
        })
    };

    render() {
        return (
            <Modal open={this.props.showModal}>
                <div className={"modal"}>
                    <Typography variant="h2" className={"title"}>
                        Join Room
                    </Typography>
                    <Typography>Enter Room ID or URL</Typography>
                    <Typography>e.g. SD23F5G or insync.com/SD23F5G</Typography>
                    <TextField
                        className={"bodyText"}
                        InputProps={{ disableUnderline: true }}
                        margin="normal"
                        name="title"
                        value={this.state.title}
                        placeholder="e.g. SD23F5G or insync.com/SD23F5G"
                        onChange={this.setRoomTitle}
                    />
                    <div className={"modalButtons"}>
                        <Button className={"cancelButton"} onClick={this.props.onClose}>
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
};

export default JoinRoomModal;