import expect from "expect.js";
import querystring from "querystring";
import { anything, deepEqual, instance, spy, verify, when } from "ts-mockito";
import { createURLSyncRepository } from "./dataRepository";

describe("URL sync repository", () => {
  const pathname = "/user/1";
  const params = { a: "1", b: "2" };
  const search = `?${querystring.stringify(params)}`;
  const location = { pathname, search, state: {}, hash: "" };
  let client;
  let urlSync;

  beforeEach(() => {
    client = spy({
      get: () => Promise.reject(""),
      post: () => Promise.reject(""),
      patch: () => Promise.reject("")
    });

    urlSync = createURLSyncRepository({ location }, instance(client));
  });

  it("Should get data correctly", async () => {
    // Setup
    const data = { a: 0, b: 1, c: 2 };
    when(client.get(pathname, anything())).thenResolve(data);

    // When
    const result = await urlSync.get();

    // Then
    verify(client.get(pathname, deepEqual({ params }))).once();
    expect(result).to.eql(data);
  });

  it("Should update data correctly", async () => {
    // Setup
    const data = { a: 0, b: 1, c: 2 };
    when(client.patch(pathname, anything(), anything())).thenResolve(data);

    // When
    const result = await urlSync.update(data);

    // Then
    verify(
      client.patch(pathname, deepEqual(data), deepEqual({ params }))
    ).once();

    expect(result).to.eql(data);
  });
});
