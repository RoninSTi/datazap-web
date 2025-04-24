import type { PropsWithChildren } from 'react';

import { NavBarLayout } from '@/components/NavBarLayout';

const LogsLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <NavBarLayout>{children}</NavBarLayout>
);

export default LogsLayout;
