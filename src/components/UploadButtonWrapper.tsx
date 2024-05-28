import { useS3Upload } from 'next-s3-upload';
import type { ReactNode } from 'react';

type ChildProps = {
  openFileDialog: () => void;
};

type Props = {
  children: (props: ChildProps) => ReactNode;
  className?: string;
  onUploadSuccess: (url: string) => void;
};

const UploadButtonWrapper: React.FC<Props> = ({
  children,
  className,
  onUploadSuccess,
}) => {
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: any) => {
    const { url } = await uploadToS3(file);
    onUploadSuccess(url);
  };

  return (
    <div className={className}>
      <FileInput onChange={handleFileChange} />

      {children({ openFileDialog })}
    </div>
  );
};

export { UploadButtonWrapper };
