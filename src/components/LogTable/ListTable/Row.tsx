import { format } from 'date-fns';
import React from 'react';

import { useFavoriteLog } from '@/api/mutations/favorites';
import { Checkbox } from '@/components/Checkbox';
import { DropDownMenu } from '@/components/DropDownMenu/DropDownMenu';
import { KebobButton } from '@/components/Icons/Buttons/KebobButton';
import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { Logs } from '@/components/Icons/Logs';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { BodyMediumBold } from '@/components/Typography/BodyMediumBold';
import { useBulkLogStore } from '@/store/bulkLogs';
import type { StoredLog } from '@/types/log';

import { Cell } from '../../Table/Cell';
import { Row as TableRow } from '../../Table/Row';

type Props = {
  isFavorite: boolean;
  isSelected: boolean;
  log: StoredLog;
};

const Row: React.FC<Props> = ({ isFavorite, isSelected, log }) => {
  const { id, title, notes, project, createdAt } = log;

  const favoriteLog = useFavoriteLog();

  const { selectLog } = useBulkLogStore();

  const handleOnClickStar = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    await favoriteLog.mutateAsync({ logId: id });
  };

  const checkBoxState = (): 'checked' | 'default' =>
    isSelected ? 'checked' : 'default';

  const handleCheckboxOnChange = (_value: boolean) => {
    selectLog(id);
  };

  return (
    <TableRow>
      <div className="mr-4 flex items-center">
        <Checkbox onChange={handleCheckboxOnChange} state={checkBoxState()} />
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
      <Cell className="w-[185px]" textAlign="start">
        <BodyMediumBold>{project?.name}</BodyMediumBold>
      </Cell>
      <Cell className="w-[139px]" textAlign="start">
        <BodyMedium variant="secondary">
          {format(new Date(createdAt), 'yyyy-MM-dd')}
        </BodyMedium>
      </Cell>
      <Cell className="w-[48px]">
        <StarButton onClick={handleOnClickStar} isActive={isFavorite} />
      </Cell>
      <Cell className="w-[56px]">
        <DropDownMenu MenuButton={KebobButton} />
      </Cell>
    </TableRow>
  );
};

export { Row };
