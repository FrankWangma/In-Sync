import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ViewProfile from "./ViewProfile";
import { userActions } from "../_actions";
import socket from "../socket/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "white",
    marginRight: 10,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    textColor: "#ffffff",
  },
}));

export default function ProfileButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setViewProfile(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setViewProfile(false);
  };

  const handleLogout = () => {
    if (socket.connected) {
      socket.emit('leaveRoom');
    }
    dispatch(userActions.logout());
  };

  const handleViewProfile = () => {
    setViewProfile(true);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.root}
        >
            <AccountCircleIcon style={{ marginRight: 10 }}/>
            {user.username}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            >
              {viewProfile
                ? <ViewProfile handleClose={handleClose}/>
                : <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleViewProfile}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              }
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
