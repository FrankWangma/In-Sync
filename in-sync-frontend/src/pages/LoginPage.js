import React from "react";
import Login from "../components/LoginComponent"
import SignUp from "../components/SignUpComponent"
import styles from "./LoginPage.module.css";
import { Grid } from "@material-ui/core";

const LoginPage = () => {
    return (
        <div className={styles.LoginPage}>
            <Grid container spacing={5}>
                <Grid item xs={2} />
                <Grid item sm={12} md={4}>
                    <Login />
                </Grid>
                <Grid item sm={12} md={4}>
                    <SignUp />
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </div>
    );
}

export default LoginPage; 