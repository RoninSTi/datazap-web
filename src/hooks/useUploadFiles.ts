import S3 from 'aws-sdk/clients/s3';
import { uuid } from 'next-s3-upload';
import { useCallback } from 'react';

import type { MeResponse } from '@/api/queries/user';
import type { LogToBeUploaded } from '@/types/log';

const s3params = {
  accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
};

const s3 = new S3(s3params);

interface Params {
  files: File[];
  key: string;
  userData?: MeResponse;
}

const useUploadFiles = () => {
  const upload = useCallback(
    async ({
      files,
      key,
      userData,
    }: Params): Promise<LogToBeUploaded[] | undefined> => {
      if (files.length === 0) return undefined;

      const uploads = files.map((file) => {
        const params = {
          Bucket: `${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}`,
          Key: `${key}/${userData?.user.id}/${file.name}`,
          Body: file,
        };

        const s3upload = s3.upload(params);
        // s3upload.on('httpUploadProgress', (p) => {
        //   progress.set(p.loaded / p.total);
        // });
        return s3upload.promise();
      });

      try {
        const uploadedFiles = await Promise.all(uploads);

        const fileData = uploadedFiles.map((uploadedFile, index) => ({
          url: uploadedFile.Location,
          size: files[index].size,
          filename: files[index].name,
          title: files[index].name,
          key: uuid(),
        })) satisfies LogToBeUploaded[];

        return fileData;
      } catch (err) {
        throw err instanceof Error ? err : new Error('Upload failed');
      }
    },
    [],
  );

  return {
    upload,
  };
};

export default useUploadFiles;
