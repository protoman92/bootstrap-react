import React from "react";
import { Route, Switch } from "react-router-dom";
import "./style.scss";

function PrivateApp() {
  return (
    <Switch>
      <Route
        render={() => (
          <div className="App">
            <div className="app-content" />
          </div>
        )}
      />
    </Switch>
  );
}

export default PrivateApp;
