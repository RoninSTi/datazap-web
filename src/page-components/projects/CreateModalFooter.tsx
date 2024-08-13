import React from 'react';

import { Button } from '@/components/Button';
import { Footer } from '@/components/Modal/Footer';

interface Props {
  onClose: () => void;
  onSave: () => void;
}

const CreateModalFooter: React.FC<Props> = ({ onClose, onSave }) => {
  return (
    <Footer>
      <div className="flex flex-row items-center justify-end">
        <Button className="mr-2" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </Footer>
  );
};

export { CreateModalFooter };
