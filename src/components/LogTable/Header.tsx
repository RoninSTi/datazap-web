import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

type HeaderCellProps = {
  className?: string;
};

const HeaderCell: React.FC<PropsWithChildren<HeaderCellProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames([
        'flex flex-1 text-left uppercase text-xs text-deemphasis dark:text-darkTextDeemphasis font-semibold',
        className,
      ])}
    >
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="flex flex-1 border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis">
      <div className="flex flex-1 items-center">
        <div className="flex pr-4">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
          />
        </div>
        <HeaderCell>File</HeaderCell>
        <HeaderCell>Chart Title</HeaderCell>
        <HeaderCell>Notes</HeaderCell>
        <HeaderCell>Project</HeaderCell>
      </div>
    </div>
  );
};

export { Header };
