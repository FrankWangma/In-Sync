import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, Button, TextField } from "@material-ui/core";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect( () => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleLogin = () => {
        if (username === 'username' && password === 'password') {
            setError(false);
            setHelperText('Login Successfully');
        } else {
            setError(true);
            setHelperText('Incorrect username or password');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            console.log(isButtonDisabled);
            if (!isButtonDisabled) {
                handleLogin();
            }
        }
    }

    return (
        <form noValidate autoComplete="off">
            <Card>
                <CardHeader title="In-Sync Login"/>
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
                            onChange={(e)=>setUsername(e.target.value)}
                            onKeyPress={(e)=>handleKeyPress(e)}
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
                            onChange={(e)=>setPassword(e.target.value)}
                            onKeyPress={(e)=>handleKeyPress(e)}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={()=>handleLogin()}
                    disabled={isButtonDisabled}>
                    Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;
