import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { compose, shouldUpdate } from "recompose";

interface DrawerItem {
  readonly path: string;
  readonly name: string;
  readonly icon: string;
}

interface DrawerProps {
  readonly paths: readonly DrawerItem[];
}

function PrivateDrawer({ paths: items }: DrawerProps) {
  return (
    <div className="drawer-container">
      {items.map(({ icon, path, name }) => (
        <NavLink
          className="tab"
          activeClassName={"active-tab"}
          key={path}
          to={path}
        >
          <img alt={name} src={icon} />
          <div>{name}</div>
        </NavLink>
      ))}
    </div>
  );
}

const enhance = compose<DrawerProps, DrawerProps>(shouldUpdate(() => false));

export default enhance(PrivateDrawer);
