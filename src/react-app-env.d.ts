/// <reference types="react-scripts" />
import { AxiosRequestConfig } from "axios";
import { Action } from "redux";
import { Omit } from "ts-essentials";

declare global {
  interface ReduxState {
    readonly httpClient: RelativeHTTPClient;
  }

  interface ReduxAction<Payload> extends Action<string> {
    payload: Payload;
  }

  namespace HTTPClient {
    type Config = Omit<AxiosRequestConfig, "body">;
  }

  /** Standard HTTP client that can perform API requests. */
  interface HTTPClient<Config = HTTPClient.Config> {
    get<T>(url: string, config?: Config): Promise<T>;
    post<T>(url: string, body: unknown, config?: Config): Promise<T>;
  }

  namespace RelativeHTTPClient {
    type Config = Omit<AxiosRequestConfig, "baseURL" | "body">;
  }

  /**
   * Treat client and server as if originating from the same domain, and
   * whatever URL the client is at, the server has the corresponding URL that
   * contains the data.
   *
   * e.g.
   * client -> https://localhost:8000/user/
   * server -> https://localhost:8000/user/1
   */
  interface RelativeHTTPClient extends HTTPClient<RelativeHTTPClient.Config> {}

  namespace APIRepository {}
}
