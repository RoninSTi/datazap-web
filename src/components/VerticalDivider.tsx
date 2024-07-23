import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
}

const VerticalDivider: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={classNames(
        className,
        'h-full w-[1px] bg-borderMain dark:bg-darkBorderMain',
      )}
    />
  );
};

export { VerticalDivider };
