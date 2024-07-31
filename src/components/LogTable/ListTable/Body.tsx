import { useGetLogFavorites } from '@/api/queries/favorites';
import { useGetLogs } from '@/api/queries/logs';
import { Body as TableBody } from '@/components/Table/Body';

import { Empty } from '../Empty';
import { Row } from './Row';

const Body: React.FC = () => {
  const { data } = useGetLogs();

  const { data: favoriteData } = useGetLogFavorites();

  const logs = data?.logs || [];

  const favorites = favoriteData?.favoriteLogs;

  return (
    <TableBody>
      {logs.length > 0 &&
        logs.map((log) => (
          <Row
            key={log.id}
            log={log}
            isFavorite={favorites?.some((el) => el.logId === log.id) ?? false}
            isSelected={false}
          />
        ))}
      {logs.length === 0 && <Empty />}
    </TableBody>
  );
};

export { Body };
