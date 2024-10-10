import type { PropsWithChildren } from 'react';

import { Header } from '@/components/Header';
import { NavBarLayout } from '@/components/NavBarLayout';

const DashboardLayout: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => (
  <NavBarLayout>
    <Header />
    {children}
  </NavBarLayout>
);

export default DashboardLayout;
