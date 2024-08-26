'use client';

import classNames from 'classnames';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  onClick?: () => void;
  path?: string;
}

const Row: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  path,
}) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    if (onClick !== undefined) onClick();
  };

  return path === undefined ? (
    <div
      className={classNames(
        'flex w-full border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis',
        {
          'hover:bg-surfaceSecondary hover:dark:bg-darkSurfaceSecondary cursor-pointer':
            onClick !== undefined,
        },
      )}
      onClick={onClick}
      onKeyDown={handleOnKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  ) : (
    <Link
      className={classNames(
        'flex w-full border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis hover:bg-surfaceSecondary hover:dark:bg-darkSurfaceSecondary',
      )}
      href={path}
    >
      {children}
    </Link>
  );
};

export { Row };
