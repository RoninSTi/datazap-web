import type { PropsWithChildren } from 'react';

import { NavBar } from '@/components/NavBar';

const NavBarLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="flex h-screen flex-col bg-surfacePrimary dark:bg-darkSurfacePrimary">
    <NavBar />
    {children}
  </div>
);

export { NavBarLayout };
