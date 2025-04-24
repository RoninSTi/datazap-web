import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface HeaderCellProps {
  className?: string;
  expanding?: boolean;
  textAlign?: 'center' | 'start' | 'end';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  width?: string;
}

const HeaderCell: React.FC<PropsWithChildren<HeaderCellProps>> = ({
  children,
  className,
  expanding = false,
  textAlign = 'start',
  sortable = false,
  sortDirection = null,
  onSort,
  width,
}) => {
  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  const getSortAttribute = () => {
    if (!sortDirection) return undefined;
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div
      className={classNames([
        'flex text-left uppercase text-xs text-deemphasis dark:text-darkTextDeemphasis font-semibold',
        {
          'flex-1': expanding,
          'cursor-pointer hover:text-primary': sortable,
          'justify-center': textAlign === 'center',
          'justify-start': textAlign === 'start',
          'justify-end': textAlign === 'end',
          [width || '']: width !== undefined,
        },
        className,
      ])}
      role="columnheader"
      aria-sort={getSortAttribute()}
      onClick={handleClick}
      tabIndex={sortable ? 0 : -1}
      onKeyDown={(e) => {
        if (sortable && (e.key === 'Enter' || e.key === ' ') && onSort) {
          e.preventDefault();
          onSort();
        }
      }}
    >
      <div className="flex items-center">
        {children}
        {sortable && (
          <div className="ml-1">
            {sortDirection === 'asc' && <span aria-hidden>▲</span>}
            {sortDirection === 'desc' && <span aria-hidden>▼</span>}
            {sortDirection === null && (
              <span className="opacity-30" aria-hidden>
                ▲
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { HeaderCell };
