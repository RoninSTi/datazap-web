import { Table } from "@/components/Table/Table";
import { Log } from "@/types/log";
import React from "react";
import { Header } from "./Header";
import { Empty } from "./Empty";

interface Props {
  logs: Log[];
}

const ProjectLogTable: React.FC<Props> = ({ logs }) => {
  return (
    <Table>
      <Header />
      {logs.length === 0 && <Empty />}
    </Table>
  );
};

export { ProjectLogTable };
