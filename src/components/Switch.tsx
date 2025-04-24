import { Switch as HUISwitch } from '@headlessui/react';
import React from 'react';

import { BodyMedium } from './Typography/BodyMedium';
import { BodyMediumBold } from './Typography/BodyMediumBold';

interface Props {
  checked: boolean;
  label?: string;
  subLabel?: string;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<Props> = ({ checked, label, subLabel, onChange }) => {
  const showLabel = label !== undefined || subLabel !== undefined;

  return (
    <div className="flex items-center">
      <HUISwitch
        checked={checked}
        onChange={onChange}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-buttonPrimaryBackground data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
        />
      </HUISwitch>
      {showLabel && (
        <div className="ml-4 flex flex-col">
          {label && <BodyMediumBold>{label}</BodyMediumBold>}
          {subLabel && <BodyMedium variant="secondary">{subLabel}</BodyMedium>}
        </div>
      )}
    </div>
  );
};

export { Switch };
