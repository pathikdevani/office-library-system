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


export const getColumns = (filteredInfo = {}, sortedInfo = {}) => [
  { title: 'Book title', field: 'title' },
  { title: 'Author', field: 'author' },
  // Not needed
  // { title: 'Book Owner', field: 'bookOwner' },
  { title: 'Status', field: '', type: 'status' },
  { title: 'Issue', field: '', type: 'issue' },
];
