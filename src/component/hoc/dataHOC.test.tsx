import enzyme from "enzyme";
import expect from "expect.js";
import * as H from "history";
import React from "react";
import { Provider } from "react-redux";
import { createTestComponent, createTestStore, asyncTimeout } from "testUtils";
import { instance, spy, verify, when } from "ts-mockito";
import { autoURLDataSync, AutoURLDataSyncProps } from "./dataHOC";
import util from "util";

describe("Auto URL data sync", () => {
  interface Data {
    readonly ids: readonly string[];
  }

  let client: RelativeHTTPClient;
  const TestComponent = createTestComponent<AutoURLDataSyncProps<Data>>();
  const EnhancedComponent = autoURLDataSync<Data>()(TestComponent);
  const pathname = "/user/1";
  const location: H.Location = { pathname, search: "", state: {}, hash: "" };
  let WrappedElement: JSX.Element;

  beforeEach(() => {
    client = spy<RelativeHTTPClient>({
      get: () => Promise.reject(""),
      post: () => Promise.reject("")
    });

    const testStore = createTestStore(undefined, {
      httpClient: instance(client)
    });

    WrappedElement = (
      <Provider store={testStore}>
        <EnhancedComponent location={location} />
      </Provider>
    );
  });

  it("Should perform get automatically", async done => {
    // Setup
    const data: Data = { ids: ["1", "2", "3"] };
    when(client.get(pathname)).thenResolve(data);

    // When
    const wrapper = enzyme.mount(WrappedElement);

    setTimeout(() => {
      wrapper.setProps({});
      const propData = wrapper.find(TestComponent).props().data;

      // Then
      verify(client.get(pathname)).once();
      expect(propData).to.eql(data);
      done();
    }, 1);
  });
});
