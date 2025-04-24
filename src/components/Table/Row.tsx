'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;

    if (path) {
      router.push(path);
    } else if (onClick) {
      onClick();
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    handleClick();
  };

  const baseClasses = classNames(
    'flex w-full border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis',
    {
      'hover:bg-surfaceSecondary hover:dark:bg-darkSurfaceSecondary cursor-pointer':
        (onClick !== undefined || path !== undefined) && !disabled,
      'bg-surfaceSecondary dark:bg-darkSurfaceSecondary': selected,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <div
      className={baseClasses}
      onClick={handleClick}
      onKeyDown={handleOnKeyDown}
      role="row"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
};

export { Row };
