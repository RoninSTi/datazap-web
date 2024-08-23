import type { PropsWithChildren } from "react";
import React from "react";

const Table: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="flex flex-col h-full flex-1">{children}</div>
);

export { Table };
