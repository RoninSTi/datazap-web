import { MenuItem } from '@headlessui/react';
import { format } from 'date-fns';
import React from 'react';

import { useFavoriteLog } from '@/api/mutations/favorites';
import { Checkbox } from '@/components/Checkbox';
import { DropDownMenu } from '@/components/DropDownMenu/DropDownMenu';
import { KebobButton } from '@/components/Icons/Buttons/KebobButton';
import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { Logs } from '@/components/Icons/Logs';
import { Cell, Row as TableRow } from '@/components/Table';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { BodyMediumBold } from '@/components/Typography/BodyMediumBold';
import { useBulkLogStore } from '@/store/bulkLogs';
import type { StoredLog } from '@/types/log';

type Props = {
  isFavorite: boolean;
  isSelected: boolean;
  log: StoredLog;
};

const Row: React.FC<Props> = ({ isFavorite, isSelected, log }) => {
  const { id, title, notes, createdAt } = log;

  const favoriteLog = useFavoriteLog();

  const { selectLog } = useBulkLogStore();

  const handleOnClickStar = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    await favoriteLog.mutateAsync({ logId: id });
  };

  const handleCheckboxOnChange = (_value: boolean) => {
    selectLog(id);
  };

  return (
    <TableRow selected={isSelected}>
      <Cell width="w-[56px]" textAlign="center">
        <Checkbox onChange={handleCheckboxOnChange} state={isSelected ? 'checked' : 'default'} />
      </Cell>
      <Cell expanding textAlign="start">
        <div className="mr-4 text-textPlaceholder dark:text-darkTextPlaceholder">
          <Logs />
        </div>
        <BodyMediumBold>{title}</BodyMediumBold>
      </Cell>
      <Cell expanding textAlign="start">
        <BodyMedium variant="secondary">{notes}</BodyMedium>
      </Cell>
      <Cell width="w-[139px]" textAlign="start">
        <BodyMedium variant="secondary">
          {format(new Date(createdAt), 'yyyy-MM-dd')}
        </BodyMedium>
      </Cell>
      <Cell width="w-[48px]">
        <StarButton onClick={handleOnClickStar} isActive={isFavorite} />
      </Cell>
      <Cell width="w-[56px]">
        <DropDownMenu MenuButton={KebobButton}>
          <MenuItem>
            <div>hi</div>
          </MenuItem>
          <MenuItem>
            <div>there</div>
          </MenuItem>
        </DropDownMenu>
      </Cell>
    </TableRow>
  );
};

export { Row };
