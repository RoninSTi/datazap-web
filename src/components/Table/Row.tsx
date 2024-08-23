import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  onClick?: () => void;
}

const Row: React.FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    if (onClick !== undefined) onClick();
  };

  return (
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
  );
};

export { Row };
