import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "../pages/MainPage";
import VideoPage from "../pages/VideoPage";
import LoginPage from "../pages/LoginPage";
import JoinRoomPage from "../pages/JoinRoomPage";

const paths = {
  MAINPAGE: "/",
  VIDEOPAGE: "/video",
  LOGINPAGE: "/login",
  JOINROOMPAGE: "/joinRoom",
};

const routes = (
  <Switch>
    <Route exact path={paths.MAINPAGE} component={MainPage} />
    <Route exact path={paths.VIDEOPAGE} component={VideoPage} />
    <Route exact path={paths.LOGINPAGE} component={LoginPage} />
    <Route exact path={paths.JOINROOMPAGE} component={JoinRoomPage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default routes;
