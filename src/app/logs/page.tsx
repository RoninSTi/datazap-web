'use client';

import { ListTable } from '@/components/LogTable/ListTable/ListTable';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { UploadButton } from '@/page-components/logs/UploadButton';

const LogsPage: React.FC = () => {
  return (
    <ProtectedPage>
      <PageHeader title="Logs" actions={<UploadButton />} />
      <div className="py-10">
        <ListTable />
      </div>
    </ProtectedPage>
  );
};

export default LogsPage;
