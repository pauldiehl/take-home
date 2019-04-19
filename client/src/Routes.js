import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from './components/appliedRoute.component';

import ListSource from './components/listSource.component';
import ViewSource from './components/viewSource.component';
import Login from './components/login.component';

export default ({ childProps }) =>
<Switch>
    <AppliedRoute exact path='/' component={ ListSource } props={childProps}/>
    <AppliedRoute path='/view/:id' component={ ViewSource } props={childProps}/>
    <AppliedRoute path='/login' component={ Login } props={childProps}/>
</Switch>