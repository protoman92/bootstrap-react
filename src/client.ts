import axios from "axios";

export function createBaseClient(): HTTPClient {
  return {
    get: (url, config) => axios.get(url, config).then(({ data }) => data),
    post: (url, body, config) =>
      axios.post(url, body, config).then(({ data }) => data)
  };
}

/**
 * Treat client and server as if originating from the same domain, and whatever
 * URL the client is at, the server has the corresponding URL that contains the
 * data.
 *
 * e.g.
 * client -> https://localhost:8000/user/
 * server -> https://localhost:8000/user/1
 */
export function createRelativeClient(
  window: Window,
  client: HTTPClient
): RelativeHTTPClient {
  return {
    get: (url, config) =>
      client.get(url, { ...config, baseURL: window.location.origin }),
    post: (url, body, config) =>
      client.post(url, body, { ...config, baseURL: window.location.origin })
  };
}
