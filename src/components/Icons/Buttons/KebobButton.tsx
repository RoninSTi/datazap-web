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
    <IconButton
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {defaultState && <KebobDefault />}
      {isHover && <KebobHover />}
    </IconButton>
  );
};

export { KebobButton };
