type Props = {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  actions: JSX.Element;
};

export const DashboardCard: React.FC<Props> = ({
  actions,
  icon,
  subtitle,
  title,
}) => {
  return (
    <div className="flex-1 rounded-lg border-l-4 border-s-buttonPrimaryBackground bg-surfaceTertiary px-10 py-6 dark:bg-darkSurfaceTertiary">
      <div className="mb-6">
        <div className="mb-2 flex flex-row items-center">
          <div className="mr-3 text-textPlaceholder dark:text-darkTextPlaceholder">
            {icon}
          </div>
          <div className="text-sm font-extrabold uppercase text-textMain dark:text-darkTextMain">
            {title}
          </div>
        </div>
        <div className="text-sm text-textDeemphasis dark:text-darkTextDeemphasis">
          {subtitle}
        </div>
      </div>
      <div>{actions}</div>
    </div>
  );
};
