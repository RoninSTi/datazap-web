import { format } from 'date-fns/format';
import Image from 'next/image';
import React, { useMemo } from 'react';

import { useGetProjects } from '@/api/queries/projects';
import { Checkbox } from '@/components/Checkbox';
import { KebobButton } from '@/components/Icons/Buttons/KebobButton';
import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { Cell } from '@/components/Table/Cell';
import { Header } from '@/components/Table/Header';
import { HeaderCell } from '@/components/Table/HeaderCell';
import { Row } from '@/components/Table/Row';
import { Table } from '@/components/Table/Table';
import { BodyLargeBold } from '@/components/Typography/BodyLargeBold';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { useBulkProjectStore } from '@/store/bulkProjects';

const ProjectTable: React.FC = () => {
  const { data } = useGetProjects();

  const { clearSelected, selectAll, selectProject, selectedProjects } =
    useBulkProjectStore();

  const projects = data?.projects ?? [];

  const headerCheckboxState = useMemo(() => {
    if (selectedProjects.length === projects.length && projects.length > 0) {
      return 'checked';
    }

    if (
      selectedProjects.length > 0 &&
      selectedProjects.length < projects.length
    ) {
      return 'indeterminate';
    }

    return 'default';
  }, [projects.length, selectedProjects.length]);

  const handleHeaderCheckboxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    switch (headerCheckboxState) {
      case 'checked':
      case 'indeterminate':
        clearSelected();
        break;
      case 'default':
        selectAll(projects.map((el) => el.id));
        break;
      default:
        break;
    }
  };

  return (
    <Table>
      <Header>
        <HeaderCell className="w-[56px] items-center justify-center">
          <Checkbox onChange={() => {}} state={headerCheckboxState} />
        </HeaderCell>
        <HeaderCell className="ml-4 w-[125px]" />
        <HeaderCell className="ml-6" expanding>
          Name
        </HeaderCell>
        <HeaderCell className="w-[88px]">Logs</HeaderCell>
        <HeaderCell className="w-[129px] pl-6">Added</HeaderCell>
        <HeaderCell className="w-[48px]" />
        <HeaderCell className="w-[56px]" />
      </Header>
      {projects.map((project) => (
        <Row key={project.id}>
          <Cell className="w-[56px]">
            <Checkbox
              onChange={() => selectProject(project.id)}
              state={
                selectedProjects.some((el) => el === project.id)
                  ? 'checked'
                  : 'default'
              }
            />
          </Cell>
          <Cell className="ml-4">
            {project.photo && (
              <Image
                className="rounded-lg"
                priority
                src={project.photo}
                height={70}
                width={125}
                alt="Project Photo"
              />
            )}
          </Cell>
          <Cell className="ml-6" expanding textAlign="start">
            <div className="flex flex-col">
              <BodyLargeBold variant="main">{project.name}</BodyLargeBold>
              <BodyMedium variant="secondary">{project.description}</BodyMedium>
            </div>
          </Cell>
          <Cell className="w-[88px]" textAlign="start">
            <BodyMedium variant="secondary">{project.logs.length}</BodyMedium>
          </Cell>
          <Cell className="w-[129px]">
            <BodyMedium variant="secondary">
              {format(new Date(project.createdAt), 'yyyy-MM-dd')}
            </BodyMedium>
          </Cell>
          <Cell className="w-[48px]">
            <StarButton onClick={() => {}} isActive={false} />
          </Cell>
          <Cell className="w-[56px]">
            <KebobButton onClick={() => {}} />
          </Cell>
        </Row>
      ))}
    </Table>
  );
};

export { ProjectTable };