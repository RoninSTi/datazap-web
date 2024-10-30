import { Button } from '../Button';
import { Account } from '../Icons/Account';
import { Edit } from '../Icons/Edit';
import { Help } from '../Icons/Help';
import { Settings } from '../Icons/Settings';
import { ActionContainer } from './ActionContainer';
import { DashboardCard } from './DashboardCard';

export const AccountDashboardCard: React.FC = () => (
  <DashboardCard
    className="ml-6"
    icon={<Account />}
    title="Account"
    subtitle="Manage billing, chart layouts, theme settings, and more."
    actions={
      <ActionContainer>
        <Button className="whitespace-nowrap" variant="secondary">
          <Settings height={18} width={18} />
          Settings
        </Button>
        <Button className="whitespace-nowrap" variant="secondary">
          <Edit />
          Edit Profile
        </Button>
        <Button className="whitespace-nowrap" variant="secondary">
          <Help height={18} width={18} />
          Tutorials
        </Button>
      </ActionContainer>
    }
  />
);
