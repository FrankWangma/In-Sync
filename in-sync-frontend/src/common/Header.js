import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import socket from "../socket/socket";

/* eslint no-nested-ternary: 0 */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 0,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const path = window.location.pathname;

  const handleReturn = () => {
    if (socket.connected) {
      socket.emit("leaveRoom");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {path !== "/"
            ? <Link to={"/"}>
              <Button variant="contained" color="secondary" onClick={handleReturn}>Return Home</Button>
            </Link>
            : <></>
          }
          <div variant="h6" className={classes.title} />
          {loggedIn
            ? <ProfileButton />
            : <Link to={"/login"}>
              <Button variant="contained" color="secondary">Login</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
