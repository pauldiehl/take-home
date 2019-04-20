import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./components/notFound.component";
import AppliedRoute from "./components/appliedRoute.component";
import AuthenticatedRoute from "./components/authenticatedRoute.component";
import UnauthenticatedRoute from "./components/unauthenticatedRoute.component";

import Home from "./components/home.component";
import ListSource from './components/listSource.component';
import ViewSource from './components/viewSource.component';
import Login from './components/login.component';

export default ({ childProps }) =>
<Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute path='/sources' component={ ListSource } props={childProps}/>
    <AuthenticatedRoute path='/view/:id' component={ ViewSource } props={childProps}/>
    <UnauthenticatedRoute path='/login' component={ Login } props={childProps}/>
    <Route component={NotFound} />
</Switch>