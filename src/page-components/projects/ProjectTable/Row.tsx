import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import { useFavoriteProject } from '@/api/mutations/favorites';
import { useGetProjectFavorites } from '@/api/queries/favorites';
import { useGetProjectLogs } from '@/api/queries/projectLogs';
import { Checkbox } from '@/components/Checkbox';
import { DropDownMenu } from '@/components/DropDownMenu/DropDownMenu';
import { KebobButton } from '@/components/Icons/Buttons/KebobButton';
import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { Folder } from '@/components/Icons/Folder';
import { Cell, Row as TableRow } from '@/components/Table';
import { BodyLargeBold } from '@/components/Typography/BodyLargeBold';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { useBulkProjectStore } from '@/store/bulkProjects';
import { type Project } from '@/types/project';

interface Props {
  project: Project;
}

const Row: React.FC<Props> = ({ project }) => {
  const { data: projectLogData } = useGetProjectLogs({
    projectId: project.id,
  });
  const { data: favoriteData } = useGetProjectFavorites();

  const favorites = favoriteData?.favoriteProjects ?? [];
  const projectLogs = projectLogData?.logs ?? [];

  const favoriteProject = useFavoriteProject();
  const { selectProject, selectedProjects } = useBulkProjectStore();

  const handleOnClickFavorite = () =>
    favoriteProject.mutateAsync({ projectId: project.id });

  const isSelected = selectedProjects.some((el) => el === project.id);

  return (
    <TableRow
      path={`/projects/${project.id}`}
      key={project.id}
      selected={isSelected}
    >
      <Cell width="w-[56px]" textAlign="center">
        <Checkbox
          onChange={() => selectProject(project.id)}
          state={isSelected ? 'checked' : 'default'}
        />
      </Cell>
      <Cell width="w-[125px]" className="ml-4">
        {project.photo ? (
          <Image
            className="rounded-lg"
            priority
            src={project.photo}
            height={70}
            width={125}
            alt="Project Photo"
          />
        ) : (
          <div className="flex h-[70px] w-[125px] items-center justify-center rounded-lg bg-surfaceTertiary dark:bg-darkSurfaceTertiary">
            <Folder />
          </div>
        )}
      </Cell>
      <Cell expanding className="ml-6" textAlign="start">
        <div className="flex flex-col">
          <BodyLargeBold variant="main">{project.name}</BodyLargeBold>
          <BodyMedium variant="secondary">{project.description}</BodyMedium>
        </div>
      </Cell>
      <Cell width="w-[88px]" textAlign="start">
        <BodyMedium variant="secondary">{projectLogs.length}</BodyMedium>
      </Cell>
      <Cell width="w-[129px]">
        <BodyMedium variant="secondary">
          {format(new Date(project.createdAt), 'yyyy-MM-dd')}
        </BodyMedium>
      </Cell>
      <Cell width="w-[48px]">
        <StarButton
          onClick={handleOnClickFavorite}
          isActive={favorites.some(
            (favorite) => favorite.projectId === project.id,
          )}
        />
      </Cell>
      <Cell width="w-[56px]">
        <DropDownMenu MenuButton={KebobButton} />
      </Cell>
    </TableRow>
  );
};

export { Row };
