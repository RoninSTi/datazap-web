import type { PropsWithChildren } from 'react';
import React from 'react';

const BodyLargeBold: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <span className="font-semibold text-textDeemphasis dark:text-darkTextDeemphasis">
    {children}
  </span>
);

export { BodyLargeBold };
