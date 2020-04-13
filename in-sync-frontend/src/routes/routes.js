import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "../pages/MainPage";
import VideoPage from "../pages/VideoPage";

const paths = {
  MAINPAGE: "/",
  VIDEOPAGE: "/video",
};

const routes = (
  <Switch>
    <Route exact path={paths.MAINPAGE} component={MainPage} />
    <Route exact path={paths.VIDEOPAGE} component={VideoPage} />
  </Switch>
);

export default routes;
