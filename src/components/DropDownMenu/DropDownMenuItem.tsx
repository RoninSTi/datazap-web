import { MenuItem } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { BodyMedium } from '../Typography/BodyMedium';

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const DropDownMenuItem: React.FC<PropsWithChildren<Props>> = ({
  children,
  isChecked,
  onClick,
}) => (
  <MenuItem>
    <button
      className="flex w-full flex-row items-center justify-between px-3 py-2"
      onClick={onClick}
      type="button"
    >
      <BodyMedium variant="main">{children}</BodyMedium>
      <div className="ml-3 h-[18px] w-[18px] text-buttonPrimaryBackgroundActive">
        {isChecked === true ? <CheckIcon /> : null}
      </div>
    </button>
  </MenuItem>
);

export { DropDownMenuItem };
