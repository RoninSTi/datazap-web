import { useLogStore } from '@/store/logs';

import { Body as TableBody } from '../../Table/Body';
import { Empty } from '../Empty';
import { UploadRow } from './UploadRow';

const LogsToUploadBody: React.FC = () => {
  const { logs } = useLogStore();

  console.log({ logs });

  return (
    <TableBody>
      {logs.length > 0 &&
        logs.map((log) => <UploadRow key={log.key} log={log} />)}
      {logs.length === 0 && <Empty />}
    </TableBody>
  );
};

export { LogsToUploadBody };
