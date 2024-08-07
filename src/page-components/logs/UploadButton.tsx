import React from 'react';

import { Button } from '@/components/Button';
import { Upload } from '@/components/Icons/Upload';

const UploadButton: React.FC = () => {
  return (
    <Button variant="primary" linkTo="/logs/upload">
      <Upload />
      <span>Upload Now</span>
    </Button>
  );
};

export { UploadButton };
