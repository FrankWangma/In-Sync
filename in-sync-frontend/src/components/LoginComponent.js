import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardContent, CardActions, Button, TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styles from "./LoginComponent.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    if (username === "username" && password === "password") {
      setError(false);
      history.push("/");
    } else {
      setError(true);
      setHelperText("Incorrect username or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (!isButtonDisabled) {
        handleLogin();
      }
    }
  };

  return (
        <form noValidate autoComplete="off">
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
                    color="secondary"
                    onClick={() => handleLogin()}
                    disabled={isButtonDisabled}>
                    Login
                    </Button>
                </CardActions>
            </Card>
        </form>
  );
};

export default Login;
