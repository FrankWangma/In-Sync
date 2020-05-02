import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, Card, CardHeader, CardContent, TextField, CardActions,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

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
    if(alert.message !== alertMessage) {
      setAlertMessage(alert.message);
      if (alert.type === "alert-danger") {
        setError(true);
        setHelperText(alert.message);
      }
    }
  }

  function redirect() {
    if (localStorage.getItem("user")) {
      history.push("/");
    }
  }

  return (
    <form name="form">
    <Card>
        {redirect()}
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
                  />
                  {alert.message && handleAlert()};
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
