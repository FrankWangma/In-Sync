import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Login from "../../components/LoginSignUp/LoginComponent";
import SignUp from "../../components/LoginSignUp/SignUpComponent";
import styles from "./LoginPage.module.css";
import Header from "../../common/Header";

const LoginPage = () => {
  const alert = useSelector((state) => state.alert);

  return (
    <div>
        <Header />
        <div className={styles.LoginPage}>
            {alert.type === "alert-success"
                && <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Grid container spacing={0}>
                <Grid item xs={2} />
                <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                    <Login joiningRoom={false} />
                </Grid>
                <Grid classes={{ root: styles.grid }} item sm={12} md={4}>
                    <SignUp />
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </div>
    </div>);
};

export default LoginPage;
