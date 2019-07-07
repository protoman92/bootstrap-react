import { Button } from "antd";
import { createEnhancerChain } from "bootstrap-react-essentials/dist/component/hoc/betterRecompose";
import {
  autoURLDataSync,
  AutoURLDataSyncProps
} from "bootstrap-react-essentials/dist/component/hoc/dataHOC";
import React from "react";
import "./style.scss";

function PrivateProfile({
  data,
  isLoadingData,
  saveData,
  updateData
}: AutoURLDataSyncProps<AppUser>) {
  return (
    <div className="profile-container">
      {!!data && (
        <>
          <input
            disabled={isLoadingData}
            onChange={({ target: { value: id } }) => updateData({ id })}
            spellCheck={false}
            value={data.id}
          />
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

const enhancer = createEnhancerChain().compose(autoURLDataSync<AppUser>());

export default enhancer.enhance(PrivateProfile);
