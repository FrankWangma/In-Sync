import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "../pages/MainPage";
import VideoPage from "../pages/VideoPage";
import LoginPage from "../pages/LoginPage";

const paths = {
  MAINPAGE: "/",
  VIDEOPAGE: "/video",
  LOGINPAGE: "/login",
};

const routes = (
  <Switch>
    <Route exact path={paths.MAINPAGE} component={MainPage} />
    <Route exact path={paths.VIDEOPAGE} component={VideoPage} />
    <Route exact path={paths.LOGINPAGE} component={LoginPage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default routes;
