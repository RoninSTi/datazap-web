import React from 'react';

import type { StoredLog } from '@/types/log';

import { Cell } from '../../Table/Cell';
import { Row as TableRow } from '../../Table/Row';

type Props = {
  log: StoredLog;
};

const Row: React.FC<Props> = ({ log }) => {
  const { title, notes, project, createdAt } = log;
  return (
    <TableRow>
      <div className="mr-4 flex items-center">
        <input
          type="checkbox"
          className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
        />
      </div>
      <Cell expanding>{title}</Cell>
      <Cell expanding>{notes}</Cell>
      <Cell>{project?.name}</Cell>
      <Cell>{createdAt}</Cell>
      <Cell />
      <Cell />
    </TableRow>
  );
};

export { Row };
