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
    readonly repository: APIRepository;
  }

  interface ReduxAction<Payload> extends Action<string> {
    payload: Payload;
  }

  namespace HTTPClient {
    type Config = Omit<AxiosRequestConfig, "baseURL">;
  }

  /** Standard HTTP client that can perform API requests. */
  interface HTTPClient {
    get<T>(url: string, c?: HTTPClient.Config): Promise<T>;
    post<T>(url: string, body: unknown, c?: HTTPClient.Config): Promise<T>;
    patch<T>(url: string, body: unknown, c?: HTTPClient.Config): Promise<T>;
  }

  /**
   * Treat client and server as if originating from the same domain, and
   * whatever URL the client is at, the server has the corresponding URL that
   * contains the data.
   *
   * e.g.
   * client -> https://localhost:8000/users/
   * server -> https://localhost:8000/users/1
   */
  interface RelativeHTTPClient extends HTTPClient {}

  namespace APIRepository {
    interface URLSync {
      get<T>(): Promise<T>;
      update<T>(newData: T): Promise<T>;
    }
  }

  interface APIRepository {
    readonly urlSync: APIRepository.URLSync;
  }

  interface AppUser {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
  }
}
