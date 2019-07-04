import enzyme from "enzyme";
import expect from "expect.js";
import * as H from "history";
import querystring from "querystring";
import React from "react";
import { Provider } from "react-redux";
import { asyncTimeout, createTestComponent, createTestStore } from "testUtils";
import { anything, deepEqual, instance, spy, verify, when } from "ts-mockito";
import { autoURLDataSync, AutoURLDataSyncProps } from "./dataHOC";

describe("Auto URL data sync", () => {
  interface Data {
    readonly a: number;
    readonly b: number;
    readonly c: number;
  }

  let client: RelativeHTTPClient;
  const TestComponent = createTestComponent<AutoURLDataSyncProps<Data>>();
  const EnhancedComponent = autoURLDataSync<Data>()(TestComponent);
  const pathname = "/user/1";
  const params = { a: "1", b: "2" };
  const search = `?${querystring.stringify(params)}`;
  const location: H.Location = { pathname, search, state: {}, hash: "" };
  let WrappedElement: JSX.Element;

  beforeEach(() => {
    client = spy<RelativeHTTPClient>({
      get: () => Promise.reject(""),
      post: () => Promise.reject(""),
      patch: () => Promise.reject("")
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

  it("Should perform get automatically", async () => {
    // Setup
    const data: Data = { a: 0, b: 1, c: 2 };
    when(client.get(pathname, anything())).thenResolve(data);

    // When
    const wrapper = enzyme.mount(WrappedElement);
    await asyncTimeout(1);
    wrapper.setProps({});
    const { data: propData } = wrapper.find(TestComponent).props();

    // Then
    verify(client.get(pathname, deepEqual({ params }))).once();
    expect(propData).to.eql(data);
  });

  it("Should perform save correctly", async () => {
    // Setup
    const data: Data = { a: 0, b: 1, c: 2 };
    const newData: Data = { a: 1, b: 2, c: 3 };
    when(client.get(pathname, anything())).thenResolve(data);
    when(client.patch(pathname, anything(), anything())).thenResolve(newData);

    // When
    const wrapper = enzyme.mount(WrappedElement);
    await asyncTimeout(1);
    wrapper.setProps({});
    const { updateData } = wrapper.find(TestComponent).props();
    updateData(newData);

    wrapper.setProps({});
    const { saveData } = wrapper.find(TestComponent).props();
    saveData();
    await asyncTimeout(1);

    wrapper.setProps({});
    const { data: propData } = wrapper.find(TestComponent).props();
    await asyncTimeout(1);

    // Then
    verify(client.get(pathname, deepEqual({ params }))).once();

    verify(
      client.patch(pathname, deepEqual(newData), deepEqual({ params }))
    ).once();

    expect(propData).to.eql(newData);
  });
});
