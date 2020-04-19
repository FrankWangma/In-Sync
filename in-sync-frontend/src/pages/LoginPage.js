import React from "react";
import Login from "../components/LoginComponent"
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div className={styles.LoginPage}>
            <Login />
        </div>
    );
}

export default LoginPage;