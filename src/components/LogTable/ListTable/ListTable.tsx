import React from 'react';

import { Table } from '@/components/Table';

import { Body } from './Body';
import { Header } from './Header';

const ListTable: React.FC = () => (
  <Table ariaLabel="Logs Table">
    <Header />
    <Body />
  </Table>
);

export { ListTable };