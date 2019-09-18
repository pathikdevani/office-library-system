import React, { Fragment } from 'react';
import getColumnSearchProps from '../../src/utils/getColumnSearchProps';
import api from '../api';

export const getRows = () => {
  const dataSource = [
    {
      key: '1',
      bookTitle: 'Bible',
      author: 'Christ',
      bookOwner: 'iManage',
    },
    {
      key: '2',
      bookTitle: 'Ramayan',
      author: 'Valmiki',
      bookOwner: 'God',
    },
  ];

  api.get('/getUsers')
    .then(data => {
      console.log(data);
    })
    .catch(error => { console.log(error) });
  return dataSource;
}


export const getColumns = (filteredInfo = {}, sortedInfo = {}) => [
  {
    title: 'Book title',
    dataIndex: 'bookTitle',
    key: 'bookTitle',
    // ...getColumnSearchProps('name'),
    // sorter: (a, b) => a.name.length - b.name.length,
    sorter: (item1, item2) => {
      console.log(item1, item2);
      if (item1 < item2)
        return -1;
      if (item1 > item2)
        return 1;
      return 0;
    },
    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Book Owner',
    dataIndex: 'bookOwner',
    key: 'bookOwner',
  },
  {
    title: 'Issue',
    dataIndex: 'issue',
    key: 'issue',
  },
];
