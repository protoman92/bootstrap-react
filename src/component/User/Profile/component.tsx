import { autoURLDataSync, AutoURLDataSyncProps } from "component/hoc/dataHOC";
import React from "react";
import { compose } from "recompose";
import "./style.scss";

function PrivateProfile({ data, updateData }: AutoURLDataSyncProps<AppUser>) {
  return (
    <div className="profile-container">
      {!!data && (
        <>
          <input
            onChange={({ target: { value: id } }) => updateData({ id })}
            value={data.id}
          />
          <input
            onChange={({ target: { value: firstName } }) =>
              updateData({ firstName })
            }
            value={data.firstName}
          />
          <input
            onChange={({ target: { value: lastName } }) =>
              updateData({ lastName })
            }
            value={data.lastName}
          />
          <input
            onChange={({ target: { value: username } }) =>
              updateData({ username })
            }
            value={data.username}
          />
        </>
      )}
    </div>
  );
}

const enhance = compose<any, any>(autoURLDataSync());

export default enhance(PrivateProfile);
