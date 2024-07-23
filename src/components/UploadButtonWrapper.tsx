'use client';

import { useS3Upload } from 'next-s3-upload';
import type { ReactNode } from 'react';

import { useGetMe } from '@/api/queries/user';

type ChildProps = {
  openFileDialog: () => void;
};

type Props = {
  children: (props: ChildProps) => ReactNode;
  className?: string;
  folder: 'logs' | 'images';
  onUploadSuccess: (url: string, size: number, name: string) => void;
};

const UploadButtonWrapper: React.FC<Props> = ({
  children,
  className,
  folder,
  onUploadSuccess,
}) => {
  const { data: userData } = useGetMe();

  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    if (file === undefined) return;

    const { url } = await uploadToS3(file, {
      endpoint: {
        request: {
          body: {
            folder,
            userId: userData?.user.userDetails.userId,
          },
        },
      },
    });

    console.log({ url, size: file.size, name: file.name });

    onUploadSuccess(url, file.size, file.name);
  };

  return (
    <div className={className}>
      <FileInput onChange={handleFileChange} />

      {children({ openFileDialog })}
    </div>
  );
};

export { UploadButtonWrapper };
