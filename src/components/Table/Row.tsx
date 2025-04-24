'use client';

import classNames from 'classnames';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface RowProps {
  onClick?: () => void;
  path?: string;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

const Row: React.FC<PropsWithChildren<RowProps>> = ({
  children,
  onClick,
  path,
  selected = false,
  disabled = false,
  className = '',
}) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    if (onClick !== undefined) onClick();
  };

  const baseClasses = classNames(
    'flex w-full border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis',
    {
      'hover:bg-surfaceSecondary hover:dark:bg-darkSurfaceSecondary cursor-pointer': 
        onClick !== undefined && !disabled,
      'bg-surfaceSecondary dark:bg-darkSurfaceSecondary': selected,
      'opacity-50 cursor-not-allowed': disabled
    },
    className
  );

  return path === undefined ? (
    <div
      className={baseClasses}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleOnKeyDown}
      role="row"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  ) : (
    <Link
      className={baseClasses}
      href={disabled ? '#' : path}
      role="row"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={e => {
        if (disabled) e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
};

export { Row };