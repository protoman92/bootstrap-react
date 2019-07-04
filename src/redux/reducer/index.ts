import { combineReducers, Reducer } from "redux";
import { Omit } from "ts-essentials";

export default function(): Reducer<Omit<ReduxState, "repository">> {
  return combineReducers({});
}
