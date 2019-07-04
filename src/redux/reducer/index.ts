import { combineReducers, Reducer } from "redux";
import { Omit } from "ts-essentials";

export default function(): Reducer<Omit<ReduxState, "httpClient">> {
  return combineReducers({});
}
