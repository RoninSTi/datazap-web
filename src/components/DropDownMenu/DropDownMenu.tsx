import { Menu, MenuItem, MenuItems } from '@headlessui/react';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  className?: string;
  MenuButton: React.FC;
}

const DropDownMenu: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  MenuButton,
}) => {
  return (
    <div className={classNames('flex', className)}>
      <Menu>
        <MenuButton />
        <MenuItems className="bg-surfaceTertiary dark:bg-darkSurfaceTertiary rounded-lg border-1 border-borderMain dark:border-darkBorderMain z-50" transition anchor="bottom end">
          {children}
        </MenuItems>
      </Menu>
    </div>
  );
};

export { DropDownMenu };
