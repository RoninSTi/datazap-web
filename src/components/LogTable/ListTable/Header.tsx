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
      <HeaderCell className="w-[185px] pl-5">Project</HeaderCell>
      <HeaderCell className="w-[139px] pl-6">Added</HeaderCell>
      <HeaderCell className="w-[48px]" />
      <HeaderCell className="w-[56px]" />
    </TableHeader>
  );
};

export { Header };
