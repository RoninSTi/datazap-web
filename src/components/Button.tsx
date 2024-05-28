'use client';

import classnames from 'classnames';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & PropsWithChildren;

const Button: React.FC<Props> = ({
  children,
  className = '',
  id = '',
  onClick = () => {},
  type = 'button',
  variant = 'primary',
}) => {
  return (
    <button
      id={id}
      className={classnames(
        className,
        'flex',
        'flex-row',
        'items-center',
        'justify-center',
        'gap-2',
        'text-sm',
        'px-4',
        'py-2',
        'rounded-lg',
        'font-semibold',
        {
          'text-buttonPrimaryText': variant === 'primary',
          'text-buttonSecondaryText': variant === 'secondary',
          'dark:text-darkButtonSecondaryText': variant === 'secondary',
          'bg-buttonPrimaryBackground': variant === 'primary',
          'bg-buttonSecondaryBackground': variant === 'secondary',
          'dark:bg-darkButtonSecondaryBackground': variant === 'secondary',
          'hover:bg-buttonPrimaryBackgroundHover': variant === 'primary',
          'hover:bg-buttonSecondaryBackgroundHover': variant === 'secondary',
          'border border-solid border-borderMain dark:border-darkBorderMain':
            variant === 'secondary',
        },
      )}
      onClick={onClick}
      // eslint-disable-next-line
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
