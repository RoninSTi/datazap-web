import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  className?: string;
  variant: 'main' | 'secondary';
};

const BodyMedium: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  variant,
}) => (
  <span
    className={classNames(
      'text-sm font-medium',
      {
        'text-textMain dark:text-darkTextMain': variant === 'main',
        'text-textDeemphasis dark:text-darkTextDeemphasis':
          variant === 'secondary',
      },
      className,
    )}
  >
    {children}
  </span>
);

export { BodyMedium };
