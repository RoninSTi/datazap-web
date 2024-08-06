'use client';

import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { ProjectForm } from '@/page-components/projects/create/ProjectForm';

const LogsPage: React.FC = () => {
  return (
    <ProtectedPage>
      <PageHeader title="Projects" />
      <ProjectForm />
    </ProtectedPage>
  );
};

export default LogsPage;
