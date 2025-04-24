import React, { useMemo } from 'react';

import { Checkbox } from '@/components/Checkbox';
import { Header as TableHeader, HeaderCell } from '@/components/Table';
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
    <TableHeader sticky>
      <HeaderCell width="w-[56px]" textAlign="center">
        <Checkbox onChange={handleCheckboxOnChange} state={checkboxState} />
      </HeaderCell>
      <HeaderCell width="w-[125px]" className="ml-4" />
      <HeaderCell expanding className="ml-6" textAlign="start">
        Name
      </HeaderCell>
      <HeaderCell width="w-[88px]" textAlign="start">
        Logs
      </HeaderCell>
      <HeaderCell width="w-[129px]" className="pl-6">
        Added
      </HeaderCell>
      <HeaderCell width="w-[48px]" />
      <HeaderCell width="w-[56px]" />
    </TableHeader>
  );
};

export { Header };
