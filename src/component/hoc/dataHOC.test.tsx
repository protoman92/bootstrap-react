import enzyme from "enzyme";
import expect from "expect.js";
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

  let urlSync: APIRepository.URLSync;
  const TestComponent = createTestComponent<AutoURLDataSyncProps<Data>>();
  const EnhancedComponent = autoURLDataSync<Data>()(TestComponent);
  let WrappedElement: JSX.Element;

  beforeEach(() => {
    urlSync = spy<APIRepository.URLSync>({
      get: () => Promise.reject(""),
      update: () => Promise.reject("")
    });

    const testStore = createTestStore(undefined, {
      repository: { urlSync: instance(urlSync) }
    });

    WrappedElement = (
      <Provider store={testStore}>
        <EnhancedComponent />
      </Provider>
    );
  });

  it("Should perform get automatically", async () => {
    // Setup
    const data: Data = { a: 0, b: 1, c: 2 };
    when(urlSync.get()).thenResolve(data);

    // When
    const wrapper = enzyme.mount(WrappedElement);
    const { isLoadingData: loading1 } = wrapper.find(TestComponent).props();
    expect(loading1).to.be.ok();

    await asyncTimeout(1);
    wrapper.setProps({});

    const { data: propData, isLoadingData: loading2 } = wrapper
      .find(TestComponent)
      .props();

    // Then
    verify(urlSync.get()).once();
    expect(loading2).not.to.be.ok();
    expect(propData).to.eql(data);
  });

  it("Should perform save correctly", async () => {
    // Setup
    const data: Data = { a: 0, b: 1, c: 2 };
    const newData: Data = { a: 1, b: 2, c: 3 };
    when(urlSync.get()).thenResolve(data);
    when(urlSync.update(anything())).thenResolve(newData);

    // When
    const wrapper = enzyme.mount(WrappedElement);
    await asyncTimeout(1);
    wrapper.setProps({});
    const { updateData } = wrapper.find(TestComponent).props();
    updateData(newData);

    wrapper.setProps({});
    const { saveData } = wrapper.find(TestComponent).props();
    saveData();
    wrapper.setProps({});
    const { isLoadingData: loading1 } = wrapper.find(TestComponent).props();
    expect(loading1).to.be.ok();
    await asyncTimeout(1);

    wrapper.setProps({});

    const { data: propData, isLoadingData: loading2 } = wrapper
      .find(TestComponent)
      .props();

    await asyncTimeout(1);

    // Then
    verify(urlSync.get()).once();
    verify(urlSync.update(deepEqual(newData))).once();
    expect(loading2).not.to.be.ok();
    expect(propData).to.eql(newData);
  });
});
