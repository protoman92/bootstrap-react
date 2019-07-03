import React, { ComponentType } from "react";

export function createTestComponent<Props>(): ComponentType<Props> {
  return () => <div />;
}
