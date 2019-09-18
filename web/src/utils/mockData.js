import React from 'react';

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

  return dataSource;
}


export const getColumns = (Renderer) => [
  { title: 'Book title', field: 'title', type: 'string' },
  { title: 'Author', field: 'author', type: 'string' },
  // { title: 'Book Owner', field: 'bookOwner' },
  { title: 'Status', field: 'status', type: 'string' },
  // { title: 'Issue', field: 'issue', render: (<Renderer/>) },
  {
    title: 'Issue', field: 'issue',
    render: () => (
      <div>ABCD</div>
    )
  },
];
