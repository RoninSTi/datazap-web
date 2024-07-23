import type { PropsWithChildren } from 'react';
import React from 'react';

const Header: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="flex flex-1 border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis">
    <div className="flex flex-1 items-center">{children}</div>
  </div>
);

export { Header };
