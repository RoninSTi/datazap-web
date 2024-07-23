'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const NavSearch = () => {
  return (
    <form className="flex flex-1">
      <div className="relative flex flex-1">
        <MagnifyingGlassIcon className="absolute left-0 top-0 ml-4 mt-2 h-6 w-6 text-textPlaceholder dark:placeholder:text-darkTextPlaceholder" />
        <input
          className="flex flex-1 rounded-lg border border-solid border-surfacePrimary bg-inputBackground py-2 pl-12 pr-4 placeholder:text-textPlaceholder dark:border-darkSurfacePrimary dark:bg-darkInputBackground dark:placeholder:text-darkTextPlaceholder"
          placeholder="Search my logs / projects..."
        />
      </div>
    </form>
  );
};

export { NavSearch };
