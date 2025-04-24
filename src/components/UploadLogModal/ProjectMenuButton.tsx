import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';

import { DropDownMenuButton } from '../DropDownMenu/DropDownMenuButton';
import { BodyMediumBold } from '../Typography/BodyMediumBold';

interface Props {
  title: string;
}

const ProjectMenuButton: React.FC<Props> = ({ title }) => {
  return (
    <DropDownMenuButton fullWidth variant="secondary">
      <div className="flex flex-1 items-center justify-between">
        <BodyMediumBold>{title}</BodyMediumBold>
        <div className="text-buttonPrimaryText dark:text-darkButtonSecondaryText">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </DropDownMenuButton>
  );
};

export { ProjectMenuButton };
