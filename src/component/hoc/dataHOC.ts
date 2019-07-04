import { connect } from "react-redux";
import {
  ComponentEnhancer,
  compose,
  lifecycle,
  mapProps,
  withState
} from "recompose";

export interface AutoURLDataSyncProps<Data> {
  readonly data: Data | null | undefined;
  saveData(): void;
  updateData(data: Partial<Data>): void;
}

/**
 * Automatically sync with current URL by requesting data from server using
 * said URL. This is assuming there is data provided by the server at current
 * URL, e.g. user navigates to /user/1, this will send a GET request to /user/1,
 * which should have a defined backend route that contains the relevant data.
 */
export function autoURLDataSync<Data>(): ComponentEnhancer<
  AutoURLDataSyncProps<Data>,
  {}
> {
  return compose(
    withState("data", "setData", undefined),
    connect(({ repository: { urlSync } }: ReduxState) => ({ urlSync })),
    lifecycle({
      async componentDidMount() {
        const { urlSync } = this.props as any;
        const data = await urlSync.get();
        (this.props as any).setData(data);
      }
    }),
    mapProps<any, any>(({ urlSync, data, setData, ...rest }) => ({
      ...rest,
      data,
      saveData: async () => {
        const updated = await urlSync.update(data);
        setData(updated);
      },
      updateData: (newData: Partial<Data>) =>
        setData(Object.assign({}, data, newData))
    }))
  );
}
