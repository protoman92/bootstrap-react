import { Button } from "antd";
import {
  createEnhancerChain,
  withState
} from "bootstrap-react-essentials/dist/component/hoc/betterRecompose";
import React from "react";
import { withHandlers } from "recompose";
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

const enhancer = createEnhancerChain()
  .compose(withState("username", "setUsername", ""))
  .compose(withState("password", "setPassword", ""))
  .compose(
    withHandlers({
      authenticate: ({ username, password }) => () => {}
    })
  );

export default enhancer.enhance(PrivateAuthentication);
