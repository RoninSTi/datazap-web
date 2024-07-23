import { useLogStore } from '@/store/logs';

import { Row } from './Row';
import { Empty } from './Empty';

const Body: React.FC = () => {
  const { logs } = useLogStore();

  return (
    <div className="flex flex-col">
      {logs.length > 0 && logs.map((log) => <Row key={log.key} log={log} />)}
      {logs.length === 0 && <Empty />}
    </div>
  );
};

export { Body };
