import React, { useState } from 'react';

import { IconButton } from '@/components/IconButton';

import { StarActive } from '../StarActive';
import { StarDefault } from '../StarDefault';
import { StarHover } from '../StarHover';

type Props = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StarButton: React.FC<Props> = ({ isActive, onClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const defaultState = !isHover && !isActive;

  const activeState = isActive && !isHover;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IconButton onClick={onClick}>
        {defaultState && <StarDefault />}
        {isHover && <StarHover />}
        {activeState && <StarActive />}
      </IconButton>
    </div>
  );
};

export { StarButton };
