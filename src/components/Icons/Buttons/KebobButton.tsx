import { MenuButton } from '@headlessui/react';
import React, { useState } from 'react';

import { IconButton } from '@/components/IconButton';

import { KebobDefault } from '../KebobDefault';
import { KebobHover } from '../KebobHover';

const KebobButton: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const defaultState = !isHover;

  return (
    <MenuButton className="flex">
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {defaultState && <KebobDefault />}
        {isHover && <KebobHover />}
      </div>
    </MenuButton>
  );
};

export { KebobButton };
