'use client';

import { ProtectedPage } from '@/components/ProtectedPage';
import { SubHeader } from '@/components/SubHeader';

const DashboardPage = () => {
  return (
    <ProtectedPage>
      <SubHeader />
    </ProtectedPage>
  );
};

export default DashboardPage;
