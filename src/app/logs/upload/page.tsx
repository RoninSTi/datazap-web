'use client';

import S3 from 'aws-sdk/clients/s3';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useGetMe } from '@/api/queries/user';
import { DragNdrop } from '@/components/DragNDropUpload/DragNDrop';
import { LogTable } from '@/components/LogTable/LogTable';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { PageHeaderActions } from '@/page-components/logs/create/PageHeaderActions';
import { useLogStore } from '@/store/logs';

const s3params = {
  accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
};

const s3 = new S3(s3params);

export type LogToBeUploaded = {
  filename: string;
  url: string;
  size: number;
  title: string;
  key: string;
  notes?: string;
};

const LogsCreatePage: React.FC = () => {
  const { logs, setLogs } = useLogStore();

  const { data: userData } = useGetMe();

  const handleUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const uploads = files.map((file) => {
        const params = {
          Bucket: `${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}`,
          Key: `logs/${userData?.user.id}/${file.name}`,
          Body: file,
        };

        const s3upload = s3.upload(params);
        // s3upload.on('httpUploadProgress', (p) => {
        //   progress.set(p.loaded / p.total);
        // });
        return s3upload.promise();
      });

      try {
        const uploadedLogs = await Promise.all(uploads);

        const logData = uploadedLogs.map((log, index) => ({
          url: log.Location,
          size: files[index].size,
          filename: files[index].name,
          title: files[index].name,
          key: uuidv4(),
        })) satisfies LogToBeUploaded[];

        setLogs([...logs, ...logData]);
      } catch (err) {
        console.error(err);
      }
    },
    [logs, setLogs, userData?.user.id],
  );

  const handleOnFilesSelected = (files: File[]) => handleUpload(files);

  return (
    <ProtectedPage>
      <PageHeader actions={<PageHeaderActions />} title="Upload Logs" />
      <div className="py-10">
        <DragNdrop onFilesSelected={handleOnFilesSelected} />
        <LogTable />
      </div>
    </ProtectedPage>
  );
};

export default LogsCreatePage;
