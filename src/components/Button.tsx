'use client';

import classnames from 'classnames';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & PropsWithChildren;

const Button: React.FC<Props> = ({
  children,
  className = '',
  disabled = false,
  id = '',
  onClick = () => {},
  type = 'button',
  variant = 'primary',
}) => (
  <button
    disabled={disabled}
    id={id}
    className={classnames(
      className,
      'flex',
      'flex-row',
      'items-center',
      'justify-center',
      'gap-3',
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

export { Button };
