import { useRouter } from 'next/navigation';
import React from 'react';

import { useAddLogs } from '@/api/mutations/logs';
import { Button } from '@/components/Button';
import { Upload } from '@/components/Icons/Upload';
import { Spinner } from '@/components/Spinner';
import { useLogStore } from '@/store/logs';

const UploadButton: React.FC = () => {
  const addLogs = useAddLogs();

  const router = useRouter();

  const { clearLogs, logs } = useLogStore();

  const handleOnClickUpload = async () => {
    await addLogs.mutateAsync({
      logs: logs.map((log) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { key, ...rest } = log;
        return rest;
      }),
    });

    clearLogs();

    router.push('/logs');
  };

  return (
    <Button
      disabled={logs.length === 0}
      variant="primary"
      onClick={handleOnClickUpload}
    >
      {addLogs.isLoading ? <Spinner /> : <Upload />}
      <span>Upload Now</span>
    </Button>
  );
};

export { UploadButton };
