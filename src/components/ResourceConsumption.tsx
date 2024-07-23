import classNames from 'classnames';

type Props = {
  className?: string;
  label: string;
  icon: JSX.Element;
  value: number;
  limit: number;
};

export const ResourceComsumption: React.FC<Props> = ({
  className,
  label,
  icon,
  value,
  limit,
}) => {
  return (
    <div
      className={classNames(
        'w-[150px] text-xs font-semibold uppercase text-textMain dark:text-darkTextMain',
        className,
      )}
    >
      <div className="mb-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="mr-2 text-textPlaceholder dark:text-textPlaceholder">
            {icon}
          </div>
          <div>{label}</div>
        </div>
        <div>
          {value}
          <span className="mx-1 text-textPlaceholder dark:text-darkTextPlaceholder">
            /
          </span>
          {limit}
        </div>
      </div>
      <div>
        <div className="flex h-2 w-full flex-row items-start overflow-hidden rounded bg-borderMain dark:bg-darkBorderMain">
          <div
            className="h-full bg-buttonPrimaryBackground"
            style={{ width: `${(value / limit) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
