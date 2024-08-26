import React from 'react';

import { useGetProjects } from '@/api/queries/projects';
import { Table } from '@/components/Table/Table';

import { Header } from './Header';
import { Row } from './Row';

const ProjectTable: React.FC = () => {
  const { data } = useGetProjects();

  const projects = data?.projects ?? [];

  return (
    <Table>
      <Header projects={projects} />
      {projects.map((project) => (
        <Row key={project.id} project={project} />
      ))}
    </Table>
  );
};

export { ProjectTable };
