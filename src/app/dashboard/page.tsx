'use client';

import { Header } from '@/components/Header';
import { NavBar } from '@/components/NavBar';
import { ProtectedPage } from '@/components/ProtectedPage';

const DashboardPage = () => {
  return (
    <ProtectedPage>
      <div>
        <NavBar />
        <Header />
      </div>
    </ProtectedPage>
  );
};

export default DashboardPage;
