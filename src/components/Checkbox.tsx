import { Checkbox as HUICheckBox } from '@headlessui/react';
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';
import React from 'react';

type Props = {
  onChange: (value: boolean) => void;
  state: 'default' | 'checked' | 'disabled' | 'indeterminate';
};

const Checkbox: React.FC<Props> = ({ onChange, state }) => {
  return (
    <HUICheckBox
      checked={state === 'checked'}
      className="group size-4 rounded-sm ring-2 ring-textMain hover:ring-buttonPrimaryBackgroundHover data-[checked]:bg-buttonPrimaryBackgroundActive data-[indeterminate]:bg-buttonPrimaryBackgroundActive data-[checked]:ring-buttonPrimaryBackgroundActive data-[disabled]:ring-textPlaceholder data-[indeterminate]:ring-buttonPrimaryBackgroundActive dark:ring-darkTextMain dark:data-[disabled]:ring-darkTextPlaceholder"
      disabled={state === 'disabled'}
      indeterminate={state === 'indeterminate'}
      onChange={onChange}
    >
      <CheckIcon className="hidden text-black group-data-[checked]:block" />
      <MinusIcon className="hidden text-black group-data-[indeterminate]:block" />
    </HUICheckBox>
  );
};

export { Checkbox };
