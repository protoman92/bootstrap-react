import enzyme from "enzyme";
import App from "./component";

describe("Component test", () => {
  it("Shallow test", () => {
    enzyme.shallowWithProps(App, {});
  });
});
