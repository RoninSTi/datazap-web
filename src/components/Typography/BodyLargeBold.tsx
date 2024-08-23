import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  className?: string;
  variant: 'main' | 'secondary';
};

const BodyLargeBold: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  variant,
}) => (
  <span
    className={classNames(
      'font-semibold',
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

export { BodyLargeBold };
