import axios from "axios";

export function createBaseClient(): HTTPClient {
  const baseHeaders = { "Content-Type": "application/json" };

  return {
    get: (url, headers) =>
      axios
        .get(url, { headers: { ...baseHeaders, ...headers } })
        .then(({ data }) => data),
    post: (url, body, headers) =>
      axios
        .post(url, body, { headers: { ...baseHeaders, ...headers } })
        .then(({ data }) => data),
    patch: (url, body, headers) =>
      axios
        .patch(url, body, { headers: { ...baseHeaders, ...headers } })
        .then(({ data }) => data)
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
  function getFullURL(url: string): string {
    return `${window.location.origin}${url}`;
  }

  return {
    get: (url, headers) => client.get(getFullURL(url), headers),
    post: (url, body, headers) => client.post(getFullURL(url), body, headers),
    patch: (url, body, headers) => client.patch(getFullURL(url), body, headers)
  };
}
