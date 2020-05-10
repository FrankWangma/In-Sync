import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { history } from "../_helpers"
import { Link, useLocation } from "react-router-dom";

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

const handleCancel = () => {
  history.goBack();
}

const Header = () => {
  const classes = useStyles();
  let location = useLocation();
  const [isLoginPage, setisLoginPage] = useState(location.pathname === "/login");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div variant="h6" className={classes.title} />
          {isLoginPage? 
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            :
            <Link to={"/login"}>
              <Button variant="contained" color="secondary">Login</Button>
            </Link> }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
