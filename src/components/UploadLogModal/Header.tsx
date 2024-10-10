import React from 'react';

import { Header as ModalHeader } from '@/components/Modal/Header';
import type { Project } from '@/types/project';

interface Props {
  onClose: () => void;
  project?: Project;
}

const Header: React.FC<Props> = ({ onClose, project }) => {
  return (
    <ModalHeader title={`Upload logs to ${project?.name}`} onClose={onClose} />
  );
};

export { Header };
