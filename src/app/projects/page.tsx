'use client';

import { useState } from 'react';

import { useGetProjects } from '@/api/queries/projects';
import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { CreateModal } from '@/page-components/projects/CreateModal';

const ProjectsPage: React.FC = () => {
  const { data } = useGetProjects();

  const [showModal, setShowModal] = useState<boolean>(false);

  const projects = data?.projects ?? [];

  return (
    <ProtectedPage>
      <PageHeader
        title="Projects"
        actions={<Button onClick={() => setShowModal(true)} />}
      />
      <div className="py-10">{projects.length}</div>
      <CreateModal onClose={() => setShowModal(false)} show={showModal} />
    </ProtectedPage>
  );
};

export default ProjectsPage;
