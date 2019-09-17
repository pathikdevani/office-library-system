import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Tag,
} from 'antd';

import Table from '../../../components/Table/Table';

const TableContainer = styled.div`
  margin-top: 20px;
`;

function BuildsTable(props) {
  const { app } = props;


  return (
    <Fragment>
      <TableContainer>
        <Table
          api="/builds/pagination/app"
          pagination={false}
          postData={() => ({ appId: app._id, status: 'active' })}
          title={(<div>{app.name}</div>)}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, item) => <Link to="#/">{item._id}</Link>,
            },
            {
              title: 'Action',
              key: 'action',
              width: 300,
              render: (_, item) => (
                <Tag color="orange">{item.status}</Tag>
              ),
            },
          ]}
        />
      </TableContainer>

      <TableContainer>
        <Table
          api="/builds/pagination/app"
          postData={() => ({ appId: app._id, status: 'waiting' })}
          title={(<div>{app.name}</div>)}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, item) => <Link to="#/">{item._id}</Link>,
            },
            {
              title: 'Action',
              key: 'action',
              width: 300,
              render: (_, item) => (
                <Tag color="orange">{item.status}</Tag>
              ),
            },
          ]}
        />
      </TableContainer>

      <TableContainer>
        <Table
          api="/builds/pagination/app"
          postData={() => ({ appId: app._id, status: 'success' })}
          title={(<div>{app.name}</div>)}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, item) => <Link to="#/">{item._id}</Link>,
            },
            {
              title: 'Action',
              key: 'action',
              width: 300,
              render: (_, item) => (
                <Tag color="orange">{item.status}</Tag>
              ),
            },
          ]}
        />
      </TableContainer>
      <TableContainer>
        <Table
          api="/builds/pagination/app"
          postData={() => ({ appId: app._id, status: 'failed' })}
          title={(<div>{app.name}</div>)}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, item) => <Link to="#/">{item._id}</Link>,
            },
            {
              title: 'Action',
              key: 'action',
              width: 300,
              render: (_, item) => (
                <Tag color="orange">{item.status}</Tag>
              ),
            },
          ]}
        />
      </TableContainer>
    </Fragment>
  );
}

export default BuildsTable;
