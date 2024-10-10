import type { PropsWithChildren } from "react";

import { NavBar } from "@/components/NavBar";

const NavBarLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="bg-surfacePrimary dark:bg-darkSurfacePrimary flex flex-col h-screen">
    <NavBar />
    {children}
  </div>
);

export { NavBarLayout };
