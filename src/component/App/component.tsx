import UserRouter from "component/User/Router";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./style.scss";

export default function App() {
  return (
    <Switch>
      <Route
        render={() => (
          <div className="App">
            <div className="app-content">
              <Switch>
                <Route component={UserRouter} path="/user" />
              </Switch>
            </div>
          </div>
        )}
      />
    </Switch>
  );
}
