import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  variant: 'main' | 'secondary';
};

const BodyMedium: React.FC<PropsWithChildren<Props>> = ({
  children,
  variant,
}) => (
  <span
    className={classNames('text-sm font-medium', {
      'text-textMain dark:text-darkTextMain': variant === 'main',
      'text-textDeemphasis dark:text-darkTextDeemphasis':
        variant === 'secondary',
    })}
  >
    {children}
  </span>
);

export { BodyMedium };
