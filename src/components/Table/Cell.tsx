import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  className?: string;
  expanding?: boolean;
  textAlign?: 'center' | 'start';
}

const Cell: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  expanding = false,
  textAlign = 'center',
}) => (
  <div
    className={classNames(className, 'flex items-center', {
      'flex-1': expanding,
      'justify-center': textAlign === 'center',
      'justify-start': textAlign === 'start',
    })}
  >
    {children}
  </div>
);

export { Cell };
