import React from "react";
import { Grid } from "@material-ui/core";
import Login from "../components/LoginComponent";
import SignUp from "../components/SignUpComponent";
import styles from "./LoginPage.module.css";

const LoginPage = () => (
    <div className={styles.LoginPage}>
        <Grid container spacing={0}>
            <Grid item xs={2} />
            <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                <Login />
            </Grid>
            <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                <SignUp />
            </Grid>
            <Grid item xs={2} />
        </Grid>
    </div>
);

export default LoginPage;
