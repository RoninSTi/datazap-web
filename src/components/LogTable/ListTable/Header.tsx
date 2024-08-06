import { useMemo } from 'react';

import { useGetLogs } from '@/api/queries/logs';
import { Checkbox } from '@/components/Checkbox';
import { Header as TableHeader } from '@/components/Table/Header';
import { HeaderCell } from '@/components/Table/HeaderCell';
import { useBulkLogStore } from '@/store/bulkLogs';

const Header: React.FC = () => {
  const { clearSelected, selectedLogs, selectAll } = useBulkLogStore();

  const { data } = useGetLogs();

  const logs = data?.logs || [];

  const checkboxState = useMemo(() => {
    if (selectedLogs.length === logs.length && logs.length > 0) {
      return 'checked';
    }

    if (selectedLogs.length > 0 && selectedLogs.length < logs.length) {
      return 'indeterminate';
    }

    return 'default';
  }, [logs.length, selectedLogs.length]);

  const handleCheckboxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    switch (checkboxState) {
      case 'checked':
      case 'indeterminate':
        clearSelected();
        break;
      case 'default':
        selectAll(logs.map((el) => el.id));
        break;
      default:
        break;
    }
  };

  return (
    <TableHeader>
      <div className="flex pr-4">
        <Checkbox state={checkboxState} onChange={handleCheckboxOnChange} />
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
