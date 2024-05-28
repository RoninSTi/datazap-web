'use client';

import Link from 'next/link';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Logo } from '@/components/Logo';

import { DropdownMenu } from './DropdownMenu';
import { NavSearch } from './NavSearch';

const NavBar = () => {
  const handleOnClick = () => {};

  return (
    <nav className="overflow-visible border-b-1 border-solid border-borderDeemphasis bg-surfaceSecondary px-12 py-6 dark:border-darkBorderDeemphasis dark:bg-darkSurfaceSecondary">
      <div className="flex flex-row items-center">
        <Logo />
        <Link
          className="px-4 py-2 font-semibold text-textEmphasis dark:text-darkTextEmphasis"
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 font-semibold text-textEmphasis dark:text-darkTextEmphasis"
          href="/dashboard/logs"
        >
          Logs
        </Link>
        <Link
          className="px-4 py-2 font-semibold text-textEmphasis dark:text-darkTextEmphasis"
          href="/dashboard/projects"
        >
          Projects
        </Link>
        <NavSearch />
        <div className='flex items-center justify-center'>
          <Button className="ml-6 mr-4" onClick={handleOnClick} variant="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>

            <span>Upload Log</span>
          </Button>
          <Button className="mr-6" onClick={handleOnClick} variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
            </svg>

            <span>Upgrade</span>
          </Button>
          <IconButton className="mr-6" onClick={handleOnClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </IconButton>
          <DropdownMenu>
            {({ handleOnClickTrigger, id }) => (
              <IconButton id={id} onClick={handleOnClickTrigger}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="pointer-events-none h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
            )}
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
