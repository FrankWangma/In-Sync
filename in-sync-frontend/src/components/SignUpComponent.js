import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardContent, CardActions, Button, TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styles from "./LoginComponent.module.css";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (email.trim() && username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, username, password]);

  const validateEmail = (email) => {
    // Regex used to validate email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setError(true);
      setHelperText("Please enter a valid Email");
    } else if (email === "meme@gmail.com") {
      setError(true);
      setHelperText("Email has already been used");
    } else {
      setError(false);
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (!isButtonDisabled) {
        handleSignUp();
      }
    }
  };

  return (
    <form noValidate autoComplete="off">
      <Card>
        <CardHeader className={styles.signUpHeader} title="Sign Up" />
        <CardContent>
          <div>
            <TextField
              error={error}
              fullWidth
              id="email"
              type="email"
              label="E-mail"
              placeholder="E-mail"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              error={error}
              fullWidth
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
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
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="Primary"
            onClick={() => handleSignUp()}
            disabled={isButtonDisabled}>
            Sign Up
                    </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default SignUp;
