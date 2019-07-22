import { combineReducers, Reducer } from "redux";
import { StrictOmit } from "ts-essentials";

export default function(): Reducer<StrictOmit<ReduxState, "repository">> {
  return combineReducers({});
}
