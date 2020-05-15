import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,TextField, Card, CardContent, CardHeader, ClickAwayListener, IconButton
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { userActions } from "../_actions";



const ViewProfile = (props) => {
    
    const currentUser = useSelector((state) => state.authentication.user);
    const [user, setUser] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.userName,
        password: "",
      });
    const [viewInfo, setViewInfo] = useState(true);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const {handleClose} = props;
    const dispatch = useDispatch();

    const handleEdit = () => {
        setViewInfo(false);
    }

    const handleSubmit = () => {
        dispatch(userActions.edit(user));
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        if(id === "email") {
        if(validateEmail(e.target.value)) { 
            setError(false)
            setHelperText("");
        } else {
            setError(true);
            setHelperText("Please enter a valid email");
        }
        }
        setUser((inputs) => ({ ...inputs, [id]: value }));
    }

    function validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Card>
                <CardHeader 
                    title="Profile" 
                    action={
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <TextField
                        error={error}
                        disabled={viewInfo}
                        fullWidth
                        id="firstName"
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        margin="normal" 
                        defaultValue={currentUser.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        error={error}
                        disabled={viewInfo}
                        fullWidth
                        id="lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        margin="normal"
                        defaultValue={currentUser.lastName}
                        onChange={handleChange}
                    />
                    <TextField 
                        error={error}
                        disabled={viewInfo}
                        fullWidth
                        id="username"
                        type="text"
                        label="Username"
                        placeholder="Username"
                        margin="normal"
                        defaultValue={currentUser.username}
                        onChange={handleChange}
                    />  
                    <TextField 
                        error={error}
                        disabled={viewInfo}
                        fullWidth
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        margin="Email"
                        defaultValue={currentUser.email}
                        onChange={handleChange}
                    />
                    { viewInfo?
                        null
                        :
                        <div>
                        <TextField
                            error={error}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={helperText}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        </div>
                    }
                </CardContent>
            </Card>
        </ClickAwayListener>
    )
}

export default ViewProfile;