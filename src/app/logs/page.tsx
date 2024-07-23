'use client';

import { ListTable } from '@/components/LogTable/ListTable/ListTable';
import { ProtectedPage } from '@/components/ProtectedPage';

const LogsPage: React.FC = () => {
  return (
    <ProtectedPage>
      <div className="py-10">
        <ListTable />
      </div>
    </ProtectedPage>
  );
};

export default LogsPage;
