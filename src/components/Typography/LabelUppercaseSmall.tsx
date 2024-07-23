import type { PropsWithChildren } from 'react';

export const LabelUppercaseSmall: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => (
  <span className="text-xs uppercase text-textDeemphasis dark:text-darkTextDeemphasis">
    {children}
  </span>
);
