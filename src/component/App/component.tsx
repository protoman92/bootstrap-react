import UserRouter from "component/User/Router";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Drawer from "component/Drawer/component";
import "./style.scss";

export default function App() {
  return (
    <Switch>
      <Route
        render={() => (
          <div className="App">
            <div className="app-content">
              <div className="side-drawer">
                <Drawer
                  paths={[
                    {
                      icon:
                        "https://material.io/tools/icons/static/icons/round-supervised_user_circle-24px.svg",
                      path: "/user",
                      name: "User"
                    }
                  ]}
                />
              </div>

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
