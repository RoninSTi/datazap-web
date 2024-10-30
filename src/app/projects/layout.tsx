import type { PropsWithChildren } from 'react';

import { NavBarLayout } from '@/components/NavBarLayout';

const ProjectsLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <NavBarLayout>{children}</NavBarLayout>
);

export default ProjectsLayout;
