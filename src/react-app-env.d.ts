/// <reference types="react-scripts" />
import { Action } from "redux";

declare global {
  interface GlobalState {}

  interface GlobalAction<Payload> extends Action<string> {
    payload: Payload;
  }
}
