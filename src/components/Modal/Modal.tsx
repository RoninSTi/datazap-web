import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  footer?: JSX.Element;
  header?: JSX.Element;
  show: boolean;
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  footer,
  header,
  onClose,
  show,
}) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onClose();
  };

  return (
    <>
      <div
        className={classNames(
          'fixed inset-0 z-40 h-screen w-screen bg-black bg-opacity-50',
          {
            hidden: !show,
          },
        )}
        onClick={onClose}
        onKeyDown={handleOnKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        title="Close modal"
      />
      <div
        className={classNames(
          'fixed left-1/2 top-1/2 z-50 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-surfacePrimary dark:bg-darkSurfacePrimary drop-shadow-lg',
          { hidden: !show },
        )}
      >
        {header}
        <div>{children}</div>
        {footer}
      </div>
    </>
  );
};

export { Modal };
