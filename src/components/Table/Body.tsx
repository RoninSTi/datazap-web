import type { PropsWithChildren } from 'react';
import React from 'react';

interface BodyProps {
  className?: string;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
}

const Body: React.FC<PropsWithChildren<BodyProps>> = ({ 
  children,
  className = '',
  emptyState,
  isLoading = false,
}) => {
  const hasChildren = React.Children.count(children) > 0;
  
  return (
    <div className={`flex flex-col ${className}`} role="rowgroup">
      {isLoading ? (
        <div className="flex w-full items-center justify-center p-10">
          {/* Could add a spinner component here */}
          <p className="text-deemphasis dark:text-darkTextDeemphasis">Loading...</p>
        </div>
      ) : hasChildren ? (
        children
      ) : emptyState ? (
        emptyState
      ) : (
        <div className="flex w-full items-center justify-center p-10">
          <p className="text-deemphasis dark:text-darkTextDeemphasis">No items found</p>
        </div>
      )}
    </div>
  );
};

export { Body };