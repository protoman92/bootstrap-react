import { autoURLDataSync, AutoURLDataSyncProps } from "component/hoc/dataHOC";
import React from "react";
import { compose } from "recompose";
import "./style.scss";

function PrivateProfile({ data }: AutoURLDataSyncProps<any>) {
  return <div className="profile-container" />;
}

const enhance = compose<any, any>(autoURLDataSync());

export default enhance(PrivateProfile);
