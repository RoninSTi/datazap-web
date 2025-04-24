import type { PropsWithChildren } from 'react';
import React from 'react';

interface HeaderProps {
  className?: string;
  sticky?: boolean;
}

const Header: React.FC<PropsWithChildren<HeaderProps>> = ({ 
  children,
  className = '',
  sticky = false,
}) => (
  <div 
    className={`flex w-full border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis ${sticky ? 'sticky top-0 z-10 bg-white dark:bg-black' : ''} ${className}`}
    role="rowgroup"
  >
    <div className="flex w-full items-center" role="row">
      {children}
    </div>
  </div>
);

export { Header };