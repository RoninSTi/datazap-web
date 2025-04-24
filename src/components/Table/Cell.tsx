import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface CellProps {
  className?: string;
  expanding?: boolean;
  textAlign?: 'center' | 'start' | 'end';
  truncate?: boolean;
  width?: string;
}

const Cell: React.FC<PropsWithChildren<CellProps>> = ({
  children,
  className,
  expanding = false,
  textAlign = 'center',
  truncate = false,
  width,
}) => (
  <div
    className={classNames(
      className, 
      'flex items-center', 
      {
        'flex-1': expanding,
        'justify-center': textAlign === 'center',
        'justify-start': textAlign === 'start',
        'justify-end': textAlign === 'end',
        'truncate': truncate,
        [width || '']: width !== undefined,
      }
    )}
    role="cell"
  >
    {children}
  </div>
);

export { Cell };