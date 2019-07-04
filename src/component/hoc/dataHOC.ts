import { RouteComponentProps } from "react-router-dom";
import {
  ComponentEnhancer,
  compose,
  lifecycle,
  withState,
  mapProps
} from "recompose";
import { connect } from "react-redux";

export interface AutoURLDataSyncProps<Data> {
  readonly data: Data;
}

/**
 * Automatically sync with current URL by requesting data from server using
 * said URL. This is assuming there is data provided by the server at current
 * URL, e.g. user navigates to /user/1, this will send a GET request to /user/1,
 * which should have a defined backend route that contains the relevant data.
 */
export function autoURLDataSync<Data>(): ComponentEnhancer<
  AutoURLDataSyncProps<Data>,
  Pick<RouteComponentProps<any>, "location">
> {
  return compose(
    withState("data", "setData", {}),
    connect(({ httpClient }: ReduxState) => ({ httpClient })),
    lifecycle({
      async componentDidMount() {
        const {
          location: { pathname }
        }: RouteComponentProps = this.props as any;

        const httpClient: RelativeHTTPClient = (this.props as any).httpClient;
        const data = await httpClient.get<Data>(pathname);
        (this.props as any).setData(data);
      }
    }),
    mapProps<any, any>(({ setData, ...rest }) => rest)
  );
}
