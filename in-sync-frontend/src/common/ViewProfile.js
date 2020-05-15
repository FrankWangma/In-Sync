import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,TextField, Card, CardContent, CardHeader, ClickAwayListener, IconButton
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';



const ViewProfile = (props) => {
    const [viewInfo, setViewInfo] = useState(true);
    const [error, setError] = useState(false);
    const user = useSelector((state) => state.authentication.user);
    const {handleClose} = props;
    
    const handleEdit = () => {
        setViewInfo(false);
        console.log(user);
    }

    const handleSubmit = () => {

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
                        defaultValue={user.firstName}
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
                        defaultValue={user.lastName}
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
                        defaultValue={user.username}
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
                        defaultValue={user.email}
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
                        />
                        <Button variant="contained" color="primary">Submit</Button>
                        <Button variant="outlined">Cancel</Button>
                        </div>
                    }
                </CardContent>
            </Card>
        </ClickAwayListener>
    )
}

export default ViewProfile;