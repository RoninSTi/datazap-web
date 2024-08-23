import { BodyLargeBold } from './Typography/BodyLargeBold';

type Props = {
  title: JSX.Element | string;
  actions?: JSX.Element;
};

const PageHeader: React.FC<Props> = ({ title, actions }) => (
  <div className="flex flex-row justify-between border-b-1 border-borderDeemphasis px-10 py-6 dark:border-darkBorderDeemphasis">
    {typeof title === 'string' ? (
      <BodyLargeBold variant="main">{title}</BodyLargeBold>
    ) : (
      title
    )}
    <div>{actions}</div>
  </div>
);

export { PageHeader };
