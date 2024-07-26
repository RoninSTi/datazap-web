import { format } from 'date-fns';
import React from 'react';

import { KebobButton } from '@/components/Icons/Buttons/KebobButton';
import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { Logs } from '@/components/Icons/Logs';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { BodyMediumBold } from '@/components/Typography/BodyMediumBold';
import type { StoredLog } from '@/types/log';

import { Cell } from '../../Table/Cell';
import { Row as TableRow } from '../../Table/Row';

type Props = {
  log: StoredLog;
};

const Row: React.FC<Props> = ({ log }) => {
  const { title, notes, project, createdAt } = log;

  const handleOnClickKebob = () => undefined;

  const handleOnClickStar = () => undefined;

  return (
    <TableRow>
      <div className="mr-4 flex items-center">
        <input
          type="checkbox"
          className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
        />
      </div>
      <Cell expanding textAlign="start">
        <div className="mr-4 text-textPlaceholder dark:text-darkTextPlaceholder">
          <Logs />
        </div>
        <BodyMediumBold>{title}</BodyMediumBold>
      </Cell>
      <Cell expanding textAlign="start">
        <BodyMedium variant="secondary">{notes}</BodyMedium>
      </Cell>
      <Cell className="w-[185px]">
        <BodyMediumBold>{project?.name}</BodyMediumBold>
      </Cell>
      <Cell className="w-[139px]">
        <BodyMedium variant="secondary">
          {format(new Date(createdAt), 'yyyy-MM-dd')}
        </BodyMedium>
      </Cell>
      <Cell className="w-[48px]">
        <StarButton onClick={handleOnClickStar} isActive={false} />
      </Cell>
      <Cell className="w-[56px]">
        <KebobButton onClick={handleOnClickKebob} />
      </Cell>
    </TableRow>
  );
};

export { Row };
