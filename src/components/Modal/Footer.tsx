import type { PropsWithChildren } from 'react';
import React from 'react';

const Footer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="border-t-1 border-borderDeemphasis p-6 dark:border-darkBorderDeemphasis">
      {children}
    </div>
  );
};

export { Footer };
