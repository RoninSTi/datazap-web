'use client';

import classnames from 'classnames';
import type { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClick: () => void;
} & PropsWithChildren;

const IconButton: React.FC<Props> = ({ className, children, id, onClick }) => {
  return (
    <button
      className={classnames(
        className,
        'text-textMain',
        'dark:text-darkTextMain',
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
