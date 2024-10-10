import React from 'react';

import { Button } from '@/components/Button';
import { Upload } from '@/components/Icons/Upload';

interface Props {
  onClick: () => void;
}

const UploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      <Upload />
      <span>Upload Now</span>
    </Button>
  );
};

export { UploadButton };
