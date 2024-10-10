'use client';

import { ListTable } from '@/components/LogTable/ListTable/ListTable';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { UploadLogModal } from '@/components/UploadLogModal/UploadLogModal';
import { UploadButton } from '@/page-components/logs/UploadButton';
import { useState } from 'react';

const LogsPage: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const handleOnCloseUploadModal = () => setShowUploadModal(false)

  const handleOnClickUpload = () => setShowUploadModal(true);
  
  return (
    <ProtectedPage>
      <PageHeader title="Logs" actions={<UploadButton onClick={handleOnClickUpload} />} />
      <div className="py-10">
        <ListTable />
      </div>
      <UploadLogModal onClose={handleOnCloseUploadModal} show={showUploadModal} />
    </ProtectedPage>
  );
};

export default LogsPage;
