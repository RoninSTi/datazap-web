'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { Plus } from '@/components/Icons/Plus';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { CreateModal } from '@/page-components/projects/CreateModal';
import { ProjectTable } from '@/page-components/projects/ProjectTable/ProjectTable';

const ProjectsPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ProtectedPage>
      <PageHeader
        title="Projects"
        actions={
          <Button onClick={() => setShowModal(true)}>
            <Plus />
            New Project
          </Button>
        }
      />
      <ProjectTable />
      <CreateModal onClose={() => setShowModal(false)} show={showModal} />
    </ProtectedPage>
  );
};

export default ProjectsPage;
