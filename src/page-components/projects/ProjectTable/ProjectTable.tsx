import React from 'react';

import { useGetProjects } from '@/api/queries/projects';
import { Body, Table } from '@/components/Table';

import { Header } from './Header';
import { Row } from './Row';

const ProjectTable: React.FC = () => {
  const { data } = useGetProjects();

  const projects = data?.projects ?? [];

  return (
    <Table ariaLabel="Projects Table">
      <Header projects={projects} />
      <Body
        emptyState={<div className="p-8 text-center">No projects found</div>}
      >
        {projects.map((project) => (
          <Row key={project.id} project={project} />
        ))}
      </Body>
    </Table>
  );
};

export { ProjectTable };
