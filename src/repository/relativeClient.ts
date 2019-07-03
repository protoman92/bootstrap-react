import { Omit } from "ts-essentials";

/**
 * Treat client and server as if originating from the same domain, and whatever
 * URL the client is at, the server has the corresponding URL that contains
 * the data.
 *
 * e.g.
 * client -> https://localhost:8000/user/
 * server -> https://localhost:8000/user/1
 */
export default function(window: Window, client: GlobalClient) {
  return {
    get: (url: string, config: Omit<GlobalClient.Config, "baseURL">) =>
      client.get(url, { ...config, baseURL: window.location.origin }),
    post: (
      url: string,
      body: unknown,
      config: Omit<GlobalClient.Config, "baseURL">
    ) => client.post(url, body, { ...config, baseURL: window.location.origin })
  };
}
