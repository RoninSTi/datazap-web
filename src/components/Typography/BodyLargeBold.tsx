import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  variant: 'main' | 'secondary';
};

const BodyLargeBold: React.FC<PropsWithChildren<Props>> = ({
  children,
  variant,
}) => (
  <span
    className={classNames('font-semibold', {
      'text-textMain dark:text-darkTextMain': variant === 'main',
      'text-textDeemphasis dark:text-darkTextDeemphasis':
        variant === 'secondary',
    })}
  >
    {children}
  </span>
);

export { BodyLargeBold };
