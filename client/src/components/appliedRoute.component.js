import React from "react";
import { Route } from "react-router-dom";

export default ({ component: Comp, props: propChildren, ...rest }) =>
  <Route {...rest} render={props => <Comp {...props} {...propChildren} />} />;