import React from 'react';

import { Button } from '@/components/Button';
import { Upload } from '@/components/Icons/Upload';

const CreateButton: React.FC = () => {
  return (
    <Button variant="primary" linkTo="/projects/create">
      <Upload />
      <span>Create Project</span>
    </Button>
  );
};

export { CreateButton };
