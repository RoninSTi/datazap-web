import type { PropsWithChildren } from 'react';
import React from 'react';

interface TableProps {
  className?: string;
  ariaLabel?: string;
}

const Table: React.FC<PropsWithChildren<TableProps>> = ({
  children,
  className = '',
  ariaLabel = 'Data table',
}) => (
  <div className={`flex h-full flex-1 flex-col ${className}`} role="table" aria-label={ariaLabel}>
    {children}
  </div>
);

export { Table };