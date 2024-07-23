'use client';

import { S3 } from 'aws-sdk';
import classnames from 'classnames';
import { useMotionValue } from 'framer-motion';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useGetMe } from '@/api/queries/user';

import { Logs } from './Icons/Logs';

const s3params = {
  accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
};

const s3 = new S3(s3params);

type Props = {
  className?: string;
  folder: 'logs' | 'images';
  onUploadSucess: (data: { url: string; size: number; name: string }) => void;
};

const Upload: React.FC<Props> = ({ className, folder, onUploadSucess }) => {
  const { data: userData } = useGetMe();

  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    return upload?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    progress.set(0);
    setUpload(null);
  }, [file, progress]);

  const handleUpload = useCallback(async () => {
    console.log('handleUpload', file);
    if (!file) return;
    const params = {
      Bucket: `${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}`,
      Key: `${folder}/${userData?.user.id}/${file.name}`,
      Body: file,
    };

    try {
      const s3upload = s3.upload(params);
      setUpload(s3upload);
      s3upload.on('httpUploadProgress', (p) => {
        progress.set(p.loaded / p.total);
      });
      const response = await s3upload.promise();

      onUploadSucess({
        url: response.Location,
        size: file.size,
        name: file.name,
      });
    } catch (err) {
      console.error(err);
    }
  }, [file, folder, onUploadSucess, progress, userData?.user.id]);

  useEffect(() => {
    if (file) handleUpload();
  }, [file, handleUpload]);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setFile(e.target.files![0]);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!upload) return;
    upload.abort();
    progress.set(0);
    setUpload(null);
  };

  return (
    <div className={classnames(className, 'flex')}>
      <form>
        <label htmlFor="upload">
          <div
            className={classnames(
              'text-textMain',
              'flex',
              'shrink',
              'dark:text-darkTextMain',
              'rounded-full bg-buttonPrimaryBackground p-2',
              'hover:bg-buttonPrimaryBackgroundHover',
              'cursor-pointer',
            )}
          >
            <Logs />
          </div>
          <input
            type="file"
            id="upload"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        {upload && (
          <>
            <button
              className="rounded bg-red-500 p-2 shadow"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            {/* <ProgressBar value={progress} /> */}
          </>
        )}
      </form>
    </div>
  );
};

export { Upload };
