import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "../pages/MainPage";

const paths = {
  MAINPAGE: "/",
};

const routes = (
    <Switch>
        <Route exact path={paths.MAINPAGE} component={MainPage} />
    </Switch>
);

export default routes;
