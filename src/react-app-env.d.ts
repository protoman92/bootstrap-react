/// <reference types="react-scripts" />
import { Action } from "redux";

interface GlobalState {}

interface GlobalAction<Payload> extends Action<string> {
  payload: Payload;
}
