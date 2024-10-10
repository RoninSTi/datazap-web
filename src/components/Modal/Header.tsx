import React from 'react';

import { IconButton } from '../IconButton';
import { Close } from '../Icons/Close';
import { BodyMediumBold } from '../Typography/BodyMediumBold';

type Props = {
  onClose?: () => void;
  title: string;
};

const Header: React.FC<Props> = ({ onClose, title }) => {
  return (
    <div className="flex items-center justify-between border-b-1 border-borderDeemphasis p-6 dark:border-darkBorderDeemphasis">
      <BodyMediumBold>{title}</BodyMediumBold>
      {onClose !== undefined && (
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      )}
    </div>
  );
};

export { Header };
