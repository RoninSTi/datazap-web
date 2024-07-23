import { Header as TableHeader } from '@/components/Table/Header';
import { HeaderCell } from '@/components/Table/HeaderCell';

const Header: React.FC = () => {
  return (
    <TableHeader>
      <div className="flex pr-4">
        <input
          type="checkbox"
          className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
        />
      </div>
      <HeaderCell expanding>Name</HeaderCell>
      <HeaderCell expanding>Notes</HeaderCell>
      <HeaderCell>Project</HeaderCell>
      <HeaderCell>Added</HeaderCell>
      <HeaderCell />
      <HeaderCell />
    </TableHeader>
  );
};

export { Header };
