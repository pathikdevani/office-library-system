import React from 'react';
import styled from 'styled-components';

import { Table } from 'antd';


const TableWrapper = styled.div`
  margin: 50px;
  border: 1px solid grey;
  padding: 5px;
`;

export default (props) => {
  const { dataSource, columns, } = props;


  return (
    <TableWrapper>
      <Table dataSource={dataSource} columns={columns} />
    </TableWrapper>
  );
}
