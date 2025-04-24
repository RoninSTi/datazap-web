import React, { useEffect } from 'react';

import { useGetLogFavorites } from '@/api/queries/favorites';
import { useGetProjectLogs } from '@/api/queries/projectLogs';
import { Table, Body } from '@/components/Table';
import { useBulkLogStore } from '@/store/bulkLogs';
import type { Project } from '@/types/project';

import { Empty } from './Empty';
import { Header } from './Header';
import { Row } from './Row';

interface Props {
  onShowModal: () => void;
  project?: Project;
}

const ProjectLogTable: React.FC<Props> = ({ onShowModal, project }) => {
  const { data: favoriteData } = useGetLogFavorites();

  const { data: projectLogData } = useGetProjectLogs({
    projectId: project?.id,
  });

  const favorites = favoriteData?.favoriteLogs;

  const logs = projectLogData?.logs ?? [];

  const { clearSelected, selectedLogs } = useBulkLogStore();

  useEffect(() => {
    return () => clearSelected();
  }, [clearSelected]);

  return (
    <Table ariaLabel="Project Logs">
      <Header logs={logs} />
      <Body emptyState={<Empty onClickUpload={onShowModal} />}>
        {logs.map((log) => (
          <Row
            key={log.id}
            isFavorite={
              favorites?.some((favorite) => favorite.logId === log.id) ?? false
            }
            isSelected={selectedLogs.some((id) => id === log.id)}
            log={log}
          />
        ))}
      </Body>
    </Table>
  );
};

export { ProjectLogTable };