import type { PropsWithChildren } from 'react';
import React from 'react';

const Body: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

export { Body };
