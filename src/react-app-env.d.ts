/// <reference types="react-scripts" />
import { AxiosRequestConfig } from "axios";
import { Action } from "redux";
import { Omit } from "ts-essentials";

declare global {
  interface GlobalState {}

  interface GlobalAction<Payload> extends Action<string> {
    payload: Payload;
  }

  namespace GlobalClient {
    type Config = Omit<AxiosRequestConfig, "baseURL" | "body">;
  }

  interface GlobalClient {
    get<T>(url: string, config: GlobalClient.Config): Promise<T>;

    post<T>(
      url: string,
      body: unknown,
      config: GlobalClient.Config
    ): Promise<T>;
  }

  namespace GlobalRepository {}
}
