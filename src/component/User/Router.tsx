import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile/component";

export default function UserRouter() {
  return (
    <Switch>
      <Route component={Profile} exact path={`/user/:id`} />
    </Switch>
  );
}
