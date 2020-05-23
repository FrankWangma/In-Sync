import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ authPath, unAuthPath, authComponent, unAuthComponent }) => {
    const loggedIn = useSelector((state) => state.authentication.loggedIn);

    return (
        <Route exact path={loggedIn ? authPath : unAuthPath} component={loggedIn ? authComponent : unAuthComponent} />
    );
}

export default AuthenticatedRoute;