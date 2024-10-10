import React, { useMemo } from 'react';

import { Checkbox } from '@/components/Checkbox';
import { Header as TableHeader } from '@/components/Table/Header';
import { HeaderCell } from '@/components/Table/HeaderCell';
import { useBulkLogStore } from '@/store/bulkLogs';
import type { StoredLog } from '@/types/log';

interface Props {
  logs: StoredLog[];
}

const Header: React.FC<Props> = ({ logs }) => {
  const { clearSelected, selectAll, selectedLogs } = useBulkLogStore();

  const checkboxState = useMemo(() => {
    if (selectedLogs.length === logs.length && logs.length > 0) {
      return 'checked';
    }

    if (selectedLogs.length > 0 && selectedLogs.length < logs.length) {
      return 'indeterminate';
    }

    return 'default';
  }, [logs.length, selectedLogs.length]);

  const handleCheckboxOnChange = (_value: boolean) => {
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
      <HeaderCell expanding>Log Name</HeaderCell>
      <HeaderCell expanding>Notes</HeaderCell>
      <HeaderCell className="w-[139px]">Added</HeaderCell>
      <HeaderCell className="w-[48px]" />
      <HeaderCell className="w-[56px]" />
    </TableHeader>
  );
};

export { Header };
