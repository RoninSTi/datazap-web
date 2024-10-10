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
import { Cell } from '@/components/Table/Cell';
import { Row as TableRow } from '@/components/Table/Row';
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

  return (
    <TableRow path={`/projects/${project.id}`} key={project.id}>
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
        {project.photo === null && (
          <div className="flex h-[70px] w-[125px] items-center justify-center rounded-lg bg-surfaceTertiary dark:bg-darkSurfaceTertiary">
            <Folder />
          </div>
        )}
      </Cell>
      <Cell className="ml-6" expanding textAlign="start">
        <div className="flex flex-col">
          <BodyLargeBold variant="main">{project.name}</BodyLargeBold>
          <BodyMedium variant="secondary">{project.description}</BodyMedium>
        </div>
      </Cell>
      <Cell className="w-[88px]" textAlign="start">
        <BodyMedium variant="secondary">{projectLogs.length}</BodyMedium>
      </Cell>
      <Cell className="w-[129px]">
        <BodyMedium variant="secondary">
          {format(new Date(project.createdAt), 'yyyy-MM-dd')}
        </BodyMedium>
      </Cell>
      <Cell className="w-[48px]">
        <StarButton
          onClick={handleOnClickFavorite}
          isActive={favorites.some(
            (favorite) => favorite.projectId === project.id,
          )}
        />
      </Cell>
      <Cell className="w-[56px]">
        <DropDownMenu MenuButton={KebobButton} />
      </Cell>
    </TableRow>
  );
};

export { Row };
