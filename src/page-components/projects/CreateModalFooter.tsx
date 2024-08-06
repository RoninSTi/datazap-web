import React from 'react';

import { Button } from '@/components/Button';
import { Footer } from '@/components/Modal/Footer';

interface Props {
  onClose: () => void;
}

const CreateModalFooter: React.FC<Props> = ({ onClose }) => {
  return (
    <Footer>
      <div className="flex flex-row items-center justify-end">
        <Button className="mr-2" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </Footer>
  );
};

export { CreateModalFooter };
