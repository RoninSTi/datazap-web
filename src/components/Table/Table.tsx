import type { PropsWithChildren } from 'react';
import React from 'react';

const Table: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="flex flex-1 flex-col border-b-1 border-borderDeemphasis dark:border-darkBorderDeemphasis">
    {children}
  </div>
);

export { Table };
