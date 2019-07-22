import { Button } from "antd";
import {
  urlDataSync,
  URLDataSyncInProps
} from "bootstrap-react-essentials/dist/component/hoc/dataHOC";
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import "./style.scss";
import { lifecycle } from "bootstrap-react-essentials/dist/component/hoc/betterRecompose";

function PrivateProfile({
  data,
  isLoadingData,
  saveData,
  updateData
}: URLDataSyncInProps<AppUser>) {
  return (
    <div className="profile-container">
      {!!data && (
        <>
          <input disabled={true} readOnly spellCheck={false} value={data._id} />
          <input
            disabled={isLoadingData}
            onChange={({ target: { value: firstName } }) =>
              updateData({ firstName })
            }
            spellCheck={false}
            value={data.firstName}
          />
          <input
            disabled={isLoadingData}
            onChange={({ target: { value: lastName } }) =>
              updateData({ lastName })
            }
            spellCheck={false}
            value={data.lastName}
          />
          <input
            disabled={isLoadingData}
            onChange={({ target: { value: username } }) =>
              updateData({ username })
            }
            spellCheck={false}
            value={data.username}
          />
          <Button
            className="update"
            loading={isLoadingData}
            onClick={saveData}
            type="primary"
          >
            Update user
          </Button>
        </>
      )}
    </div>
  );
}

const enhancer = compose<any, any>(
  connect(({ repository: { urlDataSync } }: ReduxState) => ({ urlDataSync })),
  urlDataSync<AppUser>(),
  lifecycle({
    componentDidMount() {
      (this.props as any).getData();
    }
  })
);

export default enhancer(PrivateProfile);
