'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

type ChildProps = {
  handleOnClickTrigger: () => void;
  id: string;
};

type Props = {
  children: (props: ChildProps) => ReactNode;
};

const id = 'dz-dropdown-trigger';

const DropdownMenu: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClickTrigger = () => {
    setIsOpen((prev) => !prev);
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    if (e.target.id !== id) setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {children({ handleOnClickTrigger, id })}

      {isOpen && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className="absolute right-0 z-50 mt-2 w-full min-w-[150px] rounded border-1 border-borderDeemphasis bg-surfaceSecondary dark:border-darkBorderDeemphasis dark:bg-darkSurfaceSecondary">
            <ul>
              <li className="border-b-1 border-borderDeemphasis p-2 dark:border-darkBorderDeemphasis">
                <span className="text-textDeemphasis dark:text-darkTextDeemphasis">
                  Option 1
                </span>
              </li>
              <li className="border-b-1 border-borderDeemphasis p-2 dark:border-darkBorderDeemphasis">
                <span className="text-textDeemphasis dark:text-darkTextDeemphasis">
                  Option 1
                </span>
              </li>
              <li className="p-2">
                <span className="text-textDeemphasis dark:text-darkTextDeemphasis">
                  Option 1
                </span>
              </li>
            </ul>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export { DropdownMenu };
