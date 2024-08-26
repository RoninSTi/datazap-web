import React, { useMemo } from 'react';

import { Checkbox } from '@/components/Checkbox';
import { Header as TableHeader } from '@/components/Table/Header';
import { HeaderCell } from '@/components/Table/HeaderCell';
import { useBulkProjectStore } from '@/store/bulkProjects';
import type { Project } from '@/types/project';

interface Props {
  projects: Project[];
}

const Header: React.FC<Props> = ({ projects }) => {
  const { clearSelected, selectAll, selectedProjects } = useBulkProjectStore();

  const checkboxState = useMemo(() => {
    if (selectedProjects.length === projects.length && projects.length > 0) {
      return 'checked';
    }

    if (
      selectedProjects.length > 0 &&
      selectedProjects.length < projects.length
    ) {
      return 'indeterminate';
    }

    return 'default';
  }, [projects.length, selectedProjects.length]);

  const handleCheckboxOnChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    switch (checkboxState) {
      case 'checked':
      case 'indeterminate':
        clearSelected();
        break;
      case 'default':
        selectAll(projects.map((el) => el.id));
        break;
      default:
        break;
    }
  };

  return (
    <TableHeader>
      <HeaderCell className="w-[56px] items-center justify-center">
        <Checkbox onChange={handleCheckboxOnChange} state={checkboxState} />
      </HeaderCell>
      <HeaderCell className="ml-4 w-[125px]" />
      <HeaderCell className="ml-6" expanding>
        Name
      </HeaderCell>
      <HeaderCell className="w-[88px]">Logs</HeaderCell>
      <HeaderCell className="w-[129px] pl-6">Added</HeaderCell>
      <HeaderCell className="w-[48px]" />
      <HeaderCell className="w-[56px]" />
    </TableHeader>
  );
};

export { Header };
