import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { compose, shouldUpdate } from "recompose";

interface DrawerItem {
  readonly path: string;
  readonly name: string;
}

interface DrawerProps {
  readonly paths: readonly DrawerItem[];
}

function PrivateDrawer({ paths: items }: DrawerProps) {
  return (
    <div className="drawer-container">
      {items.map(({ path, name }) => (
        <NavLink activeClassName={"active-tab"} exact key={path} to={path}>
          {name}
        </NavLink>
      ))}
    </div>
  );
}

const enhance = compose<DrawerProps, DrawerProps>(shouldUpdate(() => false));

export default enhance(PrivateDrawer);
