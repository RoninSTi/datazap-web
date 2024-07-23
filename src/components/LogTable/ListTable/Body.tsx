import { useGetLogs } from '@/api/queries/logs';
import { Body as TableBody } from '@/components/Table/Body';

import { Empty } from '../Empty';
import { Row } from './Row';

const Body: React.FC = () => {
  const { data } = useGetLogs();

  const logs = data?.logs || [];

  return (
    <TableBody>
      {logs.length > 0 && logs.map((log) => <Row key={log.id} log={log} />)}
      {logs.length === 0 && <Empty />}
    </TableBody>
  );
};

export { Body };
