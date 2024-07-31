import React, { useState } from 'react';

import { IconButton } from '@/components/IconButton';

import { KebobDefault } from '../KebobDefault';
import { KebobHover } from '../KebobHover';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const KebobButton: React.FC<Props> = ({ onClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const defaultState = !isHover;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IconButton onClick={onClick}>
        {defaultState && <KebobDefault />}
        {isHover && <KebobHover />}
      </IconButton>
    </div>
  );
};

export { KebobButton };
