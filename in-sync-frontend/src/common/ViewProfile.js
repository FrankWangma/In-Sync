import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, TextField, Card, CardContent, CardHeader, ClickAwayListener, IconButton,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { userActions } from "../_actions";
import styles from "./ViewProfile.module.css";

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 1)", // (default alpha is 0.38)
    },
  },
})(TextField);

const useStyles = makeStyles(() => ({
  root: {
    marginRight: 10,
  },
}));

const ViewProfile = (props) => {
  const classes = useStyles();
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
  const { handleClose } = props;
  const dispatch = useDispatch();

  const toggleEdit = () => {
    setViewInfo(((prevEdit) => (!prevEdit)));
  };

  const handleSubmit = () => {
    dispatch(userActions.edit(user));
  };

  function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      if (validateEmail(e.target.value)) {
        setError(false);
        setHelperText("");
      } else {
        setError(true);
        setHelperText("Please enter a valid email");
      }
    }
    setUser((inputs) => ({ ...inputs, [id]: value }));
  };

  return (
        <ClickAwayListener onClickAway={handleClose}>
            <Card>
                <CardHeader
                    title="Profile"
                    action={
                        <IconButton onClick={toggleEdit}>
                            <EditIcon style={{ fill: "white" }}/>
                        </IconButton>
                    }
                    className={styles.profileHeader}
                />
                <CardContent>
                    <DarkerDisabledTextField
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
                    <DarkerDisabledTextField
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
                    <DarkerDisabledTextField
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
                    <DarkerDisabledTextField
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
                    { viewInfo
                      ? null
                      : <div>
                        <DarkerDisabledTextField
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
                        <Button className={classes.root} variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={toggleEdit}>Cancel</Button>
                        </div>
                    }
                </CardContent>
            </Card>
        </ClickAwayListener>
  );
};

export default ViewProfile;
