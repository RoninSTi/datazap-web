import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  className?: string;
  expanding?: boolean;
};

const HeaderCell: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  expanding = false,
}) => {
  return (
    <div
      className={classNames([
        'flex text-left uppercase text-xs text-deemphasis dark:text-darkTextDeemphasis font-semibold',
        { 'flex-1': expanding },
        className,
      ])}
    >
      {children}
    </div>
  );
};

export { HeaderCell };
