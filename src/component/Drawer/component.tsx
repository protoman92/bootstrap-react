import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { compose, shouldUpdate } from "recompose";
import "./style.scss";

interface DrawerItem {
  readonly path: string;
  readonly name: string;
}

interface DrawerProps {
  readonly currentPath: string;
  readonly items: readonly DrawerItem[];
}

function PrivateDrawer({ currentPath, items }: DrawerProps) {
  return (
    <Menu
      className="drawer-container"
      selectedKeys={items
        .filter(({ path }) => currentPath.startsWith(path))
        .map(({ path }) => path)}
    >
      {items.map(({ path, name }) => (
        <Menu.Item key={path}>
          <NavLink className="tab" activeClassName={"active-tab"} to={path}>
            <div>{name}</div>
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}

const enhance = compose<DrawerProps, DrawerProps>(shouldUpdate(() => false));

export default enhance(PrivateDrawer);
