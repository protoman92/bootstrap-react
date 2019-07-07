import { combineReducers, Reducer } from "redux";

export default function(): Reducer<OmitKeys<ReduxState, "repository">> {
  return combineReducers({});
}
