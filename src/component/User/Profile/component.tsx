import { Button } from "antd";
import { autoURLDataSync, AutoURLDataSyncProps } from "component/hoc/dataHOC";
import React from "react";
import { compose } from "recompose";
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

const enhance = compose<any, any>(autoURLDataSync());

export default enhance(PrivateProfile);
