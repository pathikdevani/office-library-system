export const getRows = () => [
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
]

export const getColumns = () => [
  {
    title: 'Book title',
    dataIndex: 'bookTitle',
    key: 'bookTitle',
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
];
