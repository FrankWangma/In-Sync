import React from "react";
import Login from "../components/LoginComponent"
import SignUp from "../components/SignUpComponent"
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div className={styles.LoginPage}>
            <Login />
            <SignUp />
        </div>
    );
}

export default LoginPage;