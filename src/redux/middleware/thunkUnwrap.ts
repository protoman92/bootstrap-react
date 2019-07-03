import { Middleware } from "redux";

export default function(): Middleware<{}, GlobalAction<any>> {
  return () => dispatch => (action: GlobalAction<any>) => {
    dispatch(action);

    if (action.payload instanceof Function) {
      dispatch(action.payload);
    }
  };
}
