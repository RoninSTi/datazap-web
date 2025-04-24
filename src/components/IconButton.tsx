'use client';

import classNames from 'classnames';
import React, { type PropsWithChildren } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: () => void;
  onFocus?: () => void;
  onMouseOut?: () => void;
  onBlur?: () => void;
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
  onFocus,
  onBlur,
  style,
  variant = 'primary',
}) => {
  return (
    <button
      className={classNames(
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
      onFocus={onFocus || onMouseOver} // Use onMouseOver as fallback for onFocus
      onMouseOut={onMouseOut}
      onBlur={onBlur || onMouseOut} // Use onMouseOut as fallback for onBlur
      style={style}
      type="button"
    >
      {children}
    </button>
  );
};

export { IconButton };
