'use client';

import classnames from 'classnames';
import type { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  variant?: 'primary' | 'bubble' | 'bubble-destructive';
  style?: React.CSSProperties;
} & PropsWithChildren;

const IconButton: React.FC<Props> = ({
  className,
  children,
  id,
  onClick,
  onMouseOut,
  onMouseOver,
  style,
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
        {
          'rounded-full bg-buttonDestructiveBackground p-2':
            variant === 'bubble-destructive',
        },
      )}
      id={id}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
};

export { IconButton };
