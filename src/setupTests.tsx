import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createElement } from "react";

enzyme.configure({ adapter: new Adapter() });

declare module "enzyme" {
  function shallowWithProps<Props>(
    cls: ComponentType<Props>,
    props: Props
  ): ShallowWrapper<Props>;

  function mountWithProps<Props>(
    cls: ComponentType<Props>,
    props: Props
  ): ReactWrapper<Props>;
}

enzyme.shallowWithProps = function(cls, props) {
  return enzyme.shallow(createElement(cls, props));
};

enzyme.mountWithProps = function(cls, props) {
  return enzyme.mount(createElement(cls, props));
};
