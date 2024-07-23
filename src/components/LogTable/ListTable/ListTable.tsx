import React from 'react';

import { Table } from '@/components/Table/Table';

import { Body } from './Body';
import { Header } from './Header';

const ListTable: React.FC = () => (
  <Table>
    <Header />
    <Body />
  </Table>
);

export { ListTable };
