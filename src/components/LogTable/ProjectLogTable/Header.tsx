import { Checkbox } from "@/components/Checkbox";
import { Header as TableHeader } from "@/components/Table/Header";
import { HeaderCell } from "@/components/Table/HeaderCell";
import React from "react";

const Header: React.FC = () => {
  const handleCheckboxOnChange = () => {};

  return (
    <TableHeader>
      <div className="flex pr-4">
        <Checkbox state="default" onChange={handleCheckboxOnChange} />
      </div>
      <HeaderCell expanding>Name</HeaderCell>
      <HeaderCell expanding>Notes</HeaderCell>
      <HeaderCell className="w-[185px] pl-5">Project</HeaderCell>
      <HeaderCell className="w-[139px] pl-6">Added</HeaderCell>
      <HeaderCell className="w-[48px]" />
      <HeaderCell className="w-[56px]" />
    </TableHeader>
  );
};

export { Header }
