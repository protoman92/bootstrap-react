/// <reference types="react-scripts" />
import { AxiosRequestConfig } from "axios";
import { Action } from "redux";

declare global {
  type OmitKeys<T, K extends keyof T> = import("ts-essentials").Omit<T, K>;
  type DeepPartial<T> = import("ts-essentials").DeepPartial<T>;
  type DeepRequired<T> = import("ts-essentials").DeepRequired<T>;
  type DeepReadonly<T> = import("ts-essentials").DeepReadonly<T>;
  type DeepWriteable<T> = import("ts-essentials").DeepWritable<T>;

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
    patch<T>(url: string, body: unknown, config?: Config): Promise<T>;
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

  interface AppUser {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
  }
}
