import { Button } from "antd";
import React from "react";
import { compose, withState, withHandlers } from "recompose";
import "./style.scss";

interface AuthenticationProps {
  readonly username: string;
  readonly password: string;
  setUsername(username: string): void;
  setPassword(password: string): void;
  authenticate(): void;
}

function PrivateAuthentication({
  username = "",
  password = "",
  authenticate,
  setUsername,
  setPassword
}: AuthenticationProps) {
  return (
    <div className="authentication-container">
      <div className="content-container">
        <input
          onChange={({ target: { value } }) => setUsername(value)}
          placeholder="Enter your username"
          value={username}
        />
        <input
          onChange={({ target: { value } }) => setPassword(value)}
          placeholder="Enter your password"
          value={password}
        />
        <Button className="authenticate" onClick={authenticate} type="primary">
          Authenticate
        </Button>
      </div>
    </div>
  );
}

const enhance = compose<AuthenticationProps, {}>(
  withState("username", "setUsername", ""),
  withState("password", "setPassword", ""),
  withHandlers<Pick<AuthenticationProps, "username" | "password">, {}>({
    authenticate: ({ username, password }) => () => {}
  })
);

export default enhance(PrivateAuthentication);
