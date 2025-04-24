import { MenuButton } from '@headlessui/react';
import React, { useState } from 'react';

import { KebobDefault } from '../KebobDefault';
import { KebobHover } from '../KebobHover';

const KebobButton: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };

  return (
    <MenuButton className="flex">
      <div
        onMouseOver={handleHoverStart}
        onFocus={handleHoverStart}
        onMouseOut={handleHoverEnd}
        onBlur={handleHoverEnd}
        tabIndex={0} // Make div focusable for keyboard users
        role="button" // Add ARIA role for div that acts as a button
      >
        {!isHover ? <KebobDefault /> : <KebobHover />}
      </div>
    </MenuButton>
  );
};

export { KebobButton };
