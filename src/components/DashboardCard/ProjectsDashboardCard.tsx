import { Button } from '../Button';
import { ChevronRight } from '../Icons/ChevronRight';
import { Plus } from '../Icons/Plus';
import { Projects } from '../Icons/Projects';
import { ActionContainer } from './ActionContainer';
import { DashboardCard } from './DashboardCard';

export const ProjectsDashboardCard: React.FC = () => (
  <DashboardCard
    icon={<Projects />}
    title="Projects"
    subtitle="Organize your logs by customer, car mod, or lorem ipsum dolar."
    actions={
      <ActionContainer>
        <Button>
          <Plus />
          Create Project
        </Button>
        <Button variant="secondary">
          View All
          <ChevronRight />
        </Button>
      </ActionContainer>
    }
  />
);
