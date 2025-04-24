import { Menu, MenuItems } from '@headlessui/react';
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import React from 'react';

interface Props {
  className?: string;
  MenuButton: ReactNode | (() => ReactElement);
}

const DropDownMenu: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  MenuButton,
}) => {
  return (
    <div className={classNames('flex', className)}>
      <Menu>
        {typeof MenuButton === 'function' ? <MenuButton /> : MenuButton}
        <MenuItems
          className="z-50 rounded-lg border-1 border-borderMain bg-surfaceTertiary dark:border-darkBorderMain dark:bg-darkSurfaceTertiary"
          transition
          anchor="bottom end"
        >
          {children}
        </MenuItems>
      </Menu>
    </div>
  );
};

export { DropDownMenu };
