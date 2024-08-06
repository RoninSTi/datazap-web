'use client';

import classnames from 'classnames';
import Link from 'next/link';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  disabled?: boolean;
  id?: string;
  linkTo?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & PropsWithChildren;

type LinkProps = {
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  linkTo: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & PropsWithChildren;

const Button: React.FC<Props | LinkProps> = ({
  children,
  className = '',
  disabled = false,
  id = '',
  linkTo,
  onClick = () => {},
  type = 'button',
  variant = 'primary',
}) => {
  const classes = classnames(
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
  );
  return linkTo ? (
    <Link className={classes} href={linkTo} id={id}>
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled}
      id={id}
      className={classes}
      onClick={onClick}
      // eslint-disable-next-line
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
