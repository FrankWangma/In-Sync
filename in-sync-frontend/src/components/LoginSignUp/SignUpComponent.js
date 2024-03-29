import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, Card, CardHeader, CardContent, TextField, CardActions,
} from "@material-ui/core";
import styles from "./LoginComponent.module.css";

import { userActions } from "../../redux/_actions";

function SignUp() {
  const alert = useSelector((state) => state.alert);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setUser((inputs) => ({ ...inputs, [id]: value }));
  }

  function checkEmail(e) {
    if (validateEmail(e.target.value)) {
      setError(false);
      setHelperText("");
    } else {
      setError(true);
      setHelperText("Please enter a valid email");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (user.firstName && user.lastName && user.username && user.password) {
      setError(false);
      setHelperText("");
      dispatch(userActions.register(user));
    } else {
      setError(true);
      setHelperText("Fields cannot be empty");
    }
  }

  function handleAlert() {
    if (alert.message !== alertMessage
      && (alert.message === `Username ${user.username} is already taken`
      || alert.message === `Email ${user.email} is already taken`)) {
      setAlertMessage(alert.message);
      if (alert.type === "alert-danger") {
        setError(true);
        setHelperText(alert.message);
      }
    } else if (alert.type === "alert-success" && alert.message !== alertMessage) {
      setAlertMessage(alert.message);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
    }
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  return (
      <form name="form">
        <Card>
            <CardHeader className={styles.signUpHeader} title="Register"/>
            <CardContent>
                <div>
                    <TextField
                        error={error}
                        fullWidth
                        id="firstName"
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        margin="normal"
                        value={user.firstName}
                        onChange={handleChange}
                        onKeyDown={keyPress}
                    />
                    <TextField
                        error={error}
                        fullWidth
                        id="lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        margin="normal"
                        value={user.lastName}
                        onChange={handleChange}
                        onKeyDown={keyPress}
                    />
                    <TextField
                      error={error}
                      fullWidth
                      id="email"
                      type="text"
                      label="Email"
                      placeholder="Email"
                      margin="normal"
                      value={user.email}
                      onChange={handleChange}
                      onBlur={checkEmail}
                      onKeyDown={keyPress}
                    />
                    <TextField
                        error={error}
                        fullWidth
                        id="username"
                        type="text"
                        label="Username"
                        placeholder="Username"
                        margin="normal"
                        value={user.username}
                        onChange={handleChange}
                        onKeyDown={keyPress}
                    />
                    <TextField
                        error={error}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        margin="normal"
                        value={user.password}
                        helperText={helperText}
                        onChange={handleChange}
                        onKeyDown={keyPress}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleSubmit}>
                {registering}
                Register
                </Button>
            </CardActions>
            {alert.message && handleAlert()}
        </Card>
      </form>
  );
}

export default SignUp;
