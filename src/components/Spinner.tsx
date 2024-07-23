import classNames from 'classnames';
import React from 'react';

interface Props {
  size?: 'sm';
}

const Spinner: React.FC<Props> = ({ size = 'sm' }) => (
  <div
    className={classNames(
      'inline-block animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white',
      {
        'h-4 w-4': size === 'sm',
      },
    )}
    role="status"
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
);

export { Spinner };
