import { shallow } from "enzyme";
import React from "react";
import App from "./component";

describe("Component test", () => {
  it("Shallow test", () => {
    shallow(<App />);
  });
});
