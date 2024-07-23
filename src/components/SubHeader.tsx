import { AccountDashboardCard } from './DashboardCard/AccountDashboardCard';
import { LogsDashboardCard } from './DashboardCard/LogsDashboardCard';
import { ProjectsDashboardCard } from './DashboardCard/ProjectsDashboardCard';

export const SubHeader: React.FC = () => (
  <div className="flex flex-row items-center justify-evenly gap-10 border-b-1 border-borderDeemphasis px-10 pb-10 pt-5 dark:border-darkBorderDeemphasis">
    <LogsDashboardCard />
    <ProjectsDashboardCard />
    <AccountDashboardCard />
  </div>
);
