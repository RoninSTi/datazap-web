import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  expanding?: boolean;
}

const Cell: React.FC<PropsWithChildren<Props>> = ({
  children,
  expanding = false,
}) => (
  <div className={classNames('flex items-center pr-4', {
    'flex-1': expanding,
  })}>{children}</div>
);

export { Cell };
