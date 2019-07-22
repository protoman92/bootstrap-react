import Authentication from "component/Auth/component";
import Drawer from "component/Drawer/component";
import UserRouter from "component/User/Router";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./style.scss";

export default function App() {
  return (
    <div className="App">
      <div className="app-content">
        <Switch>
          <Route component={Authentication} exact path="/login" />
          <Route
            render={({ location: { pathname: currentPath } }) => (
              <>
                <div className="side-drawer">
                  <Drawer
                    currentPath={currentPath}
                    items={[{ path: "/users", name: "Users" }]}
                  />
                </div>

                <Switch>
                  <Route component={UserRouter} path="/users" />
                </Switch>
              </>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}
