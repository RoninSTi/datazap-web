import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  icon: JSX.Element;
  path: string;
  title: string;
};

export const NavBarLink: React.FC<Props> = ({ icon, path, title }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(path);

  return (
    <Link
      className={classNames(
        'flex items-center gap-3 px-4 py-2 text-base font-semibold hover:text-textEmphasis dark:hover:text-darkTextEmphasis',
        {
          'text-textDeemphasis dark:text-darkTextDeemphasis': !isActive,
          'text-textEmphasis dark:text-darkTextEmphasis': isActive,
        },
      )}
      href={path}
    >
      <div
        className={classNames({
          'text-darkButtonBgPrimaryActive': isActive,
        })}
      >
        {icon}
      </div>
      {title}
    </Link>
  );
};
