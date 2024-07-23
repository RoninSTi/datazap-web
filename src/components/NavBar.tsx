'use client';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Home } from '@/components/Icons/Home';
import { Logo } from '@/components/Logo';

import { DropdownMenu } from './DropdownMenu';
import { Help } from './Icons/Help';
import { Logs } from './Icons/Logs';
import { Profile } from './Icons/Profile';
import { Projects } from './Icons/Projects';
import { Settings } from './Icons/Settings';
import { Zap } from './Icons/Zap';
import { NavBarLink } from './NavBarLink';

const NavBar = () => {
  const handleOnClick = () => {};

  return (
    <nav className="overflow-visible border-b-1 border-solid border-borderDeemphasis bg-surfaceSecondary px-12 py-6 dark:border-darkBorderDeemphasis dark:bg-darkSurfaceSecondary">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <div className="mr-10 flex items-center border-r border-borderMain pr-10 dark:border-darkBorderMain">
            <Logo />
          </div>
          <NavBarLink icon={<Home />} path="/dashboard" title="Home" />
          <NavBarLink icon={<Logs />} path="/logs" title="Logs" />
          <NavBarLink
            icon={<Projects />}
            path="/dashboard/projects"
            title="Projects"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button className="mr-6" onClick={handleOnClick} variant="secondary">
            <div className="text-dzYellow">
              <Zap />
            </div>

            <span>Upgrade</span>
          </Button>
          <IconButton className="mr-6" onClick={handleOnClick}>
            <Help />
          </IconButton>
          <IconButton className="mr-6" onClick={handleOnClick}>
            <Settings />
          </IconButton>
          <DropdownMenu>
            {({ handleOnClickTrigger, id }) => (
              <IconButton id={id} onClick={handleOnClickTrigger}>
                <Profile />
              </IconButton>
            )}
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
