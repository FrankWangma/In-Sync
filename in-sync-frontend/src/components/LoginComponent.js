import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, Card, CardHeader, CardContent, TextField, CardActions,
} from "@material-ui/core";
import styles from "./LoginComponent.module.css";

import { userActions } from "../_actions";

const Login = () => {
  const alert = useSelector((state) => state.alert);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { id, value } = e.target;
    setInputs(() => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username && password) {
      setError(false);
      setHelperText("");
      dispatch(userActions.login(username, password));
    } else {
      setError(true);
      setHelperText("Fields cannot be empty");
    }
  }

  function handleAlert() {
    if (alert.message !== alertMessage
      && alert.message === "Username or password is incorrect") {
      setAlertMessage(alert.message);
      if (alert.type === "alert-danger") {
        setError(true);
        setHelperText(alert.message);
      }
    }
  }

  function keyPress(e){
    if(e.keyCode === 13){
       console.log('Login', e.target.value);
       // put the login here
    }
 }

  return (
    <form name="form">
    <Card>
          <CardHeader className={styles.loginHeader} title="In-Sync Login"/>
          <CardContent>
              <div>
                  <TextField
                      error={error}
                      fullWidth
                      id="username"
                      type="text"
                      label="Username"
                      placeholder="Username"
                      margin="normal"
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
                      helperText={helperText}
                      onChange={handleChange}
                      onKeyDown={keyPress}
                  />
                  {alert.message && handleAlert()}
              </div>
          </CardContent>
          <CardActions>
              <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleSubmit}>
              {loggingIn}
              Login
              </Button>
          </CardActions>
      </Card>
    </form>
  );
};

export default Login;
