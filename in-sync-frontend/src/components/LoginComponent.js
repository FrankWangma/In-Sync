import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./LoginComponent.module.css"
import {
  Button, Card, CardHeader, CardContent,TextField, CardActions
} from "@material-ui/core";

import { userActions } from '../_actions';

const Login = () => {
  const alert = useSelector(state => state.alert);
  const [inputs, setInputs] = useState({
      username: '',
      password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => { 
      dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
      const { id, value } = e.target;
      setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(e) {
      e.preventDefault();

      setSubmitted(true);
      if (username && password) {
          dispatch(userActions.login(username, password));
      }
  }

  function handleAlert() {
    if(alert.type == "alert-danger") {
      setError(true);
      setHelperText(alert.message);
    }
  }

  return (
      <div className={styles.loginHeader}>
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
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleSubmit}>
                    Login
                    </Button>
                </CardActions>
            </Card>
          </form>
      </div>
  );
}

export default Login;
