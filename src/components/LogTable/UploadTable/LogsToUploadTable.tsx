import { Table } from '../../Table/Table';
import { LogsToUploadBody } from './LogsToUploadBody';
import { UploadHeader } from './UploadHeader';

const LogsToUploadTable: React.FC = () => {
  return (
    <Table>
      <UploadHeader />
      <LogsToUploadBody />
    </Table>
  );
};

export { LogsToUploadTable };
