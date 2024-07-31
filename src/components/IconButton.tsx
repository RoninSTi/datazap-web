'use client';

import classnames from 'classnames';
import type { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'bubble';
} & PropsWithChildren;

const IconButton: React.FC<Props> = ({
  className,
  children,
  id,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button
      className={classnames(
        className,
        'text-textMain',
        'dark:text-darkTextMain',
        {
          'rounded-full bg-buttonPrimaryBackground p-2': variant === 'bubble',
        },
      )}
      id={id}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export { IconButton };
