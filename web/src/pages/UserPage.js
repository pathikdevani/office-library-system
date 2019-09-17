import React, { Fragment } from 'react';
import Table from '../components/Table';
import TabView from '../components/TabView';
import { getRows, getColumns } from '../utils/mockData';


export default () => {
  const dataSource = getRows();
  const columns = getColumns();

  const userTabs = [{
    tab: 'All books',
    key: 1,
    content: (
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    ),
  }, {
    tab: 'Issued books',
    key: 2,
    content: (
      <Table
        // Filter this data
        dataSource={dataSource}
        columns={columns}
      />
    ),
  }];

  return (
    <Fragment>
      <div>User</div>
      <TabView
        tabs={userTabs}
      />
    </Fragment>
  );
}
