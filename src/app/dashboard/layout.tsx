import type { PropsWithChildren } from 'react';

import { Header } from '@/components/Header';
import { NavBar } from '@/components/NavBar';

const DashboardLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="bg-surfacePrimary dark:bg-darkSurfacePrimary">
    <NavBar />
    <Header />
    {children}
  </div>
);

export default DashboardLayout;
