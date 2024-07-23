import type { PropsWithChildren } from 'react';

import { NavBar } from '@/components/NavBar';

const LogsLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="bg-surfacePrimary dark:bg-darkSurfacePrimary">
    <NavBar />
    {children}
  </div>
);

export default LogsLayout;
