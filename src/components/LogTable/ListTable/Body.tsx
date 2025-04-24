import { useGetLogFavorites } from '@/api/queries/favorites';
import { useGetLogs } from '@/api/queries/logs';
import { Body as TableBody } from '@/components/Table';
import { useBulkLogStore } from '@/store/bulkLogs';

import { Empty } from '../Empty';
import { Row } from './Row';

const Body: React.FC = () => {
  const { data, isLoading } = useGetLogs();

  const { data: favoriteData } = useGetLogFavorites();

  const { selectedLogs } = useBulkLogStore();

  const logs = data?.logs || [];

  const favorites = favoriteData?.favoriteLogs;

  return (
    <TableBody isLoading={isLoading} emptyState={<Empty />}>
      {logs.map((log) => (
        <Row
          key={log.id}
          log={log}
          isFavorite={favorites?.some((el) => el.logId === log.id) ?? false}
          isSelected={selectedLogs.some((el) => el === log.id)}
        />
      ))}
    </TableBody>
  );
};

export { Body };
