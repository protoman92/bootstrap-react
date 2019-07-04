import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "./Profile/component";

export default function UserRouter({
  match: { path }
}: RouteComponentProps<any>) {
  return (
    <Switch>
      <Route component={Profile} exact path={`${path}/:id`} />
    </Switch>
  );
}
