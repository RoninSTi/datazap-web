import { useRouter } from 'next/navigation';

import { Button } from '../Button';
import { ChevronRight } from '../Icons/ChevronRight';
import { Logs } from '../Icons/Logs';
import { Upload } from '../Icons/Upload';
import { ActionContainer } from './ActionContainer';
import { DashboardCard } from './DashboardCard';

export const LogsDashboardCard: React.FC = () => {
  const router = useRouter();

  const handleOnClickUpload = () => router.push('/dashboard/logs/create');

  return (
    <DashboardCard
      className="mr-6"
      icon={<Logs />}
      title="Logs"
      subtitle="Quickly upload, analyze, and share your data logs."
      actions={
        <ActionContainer>
          <Button className="whitespace-nowrap" onClick={handleOnClickUpload}>
            <Upload />
            Upload Log
          </Button>
          <Button className="whitespace-nowrap" variant="secondary">
            View All
            <ChevronRight />
          </Button>
        </ActionContainer>
      }
    />
  );
};
