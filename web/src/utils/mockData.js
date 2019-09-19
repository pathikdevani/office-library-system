import React, { Fragment } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PrimaryButton from '../components/PrimaryButton';
import EditIcon from '@material-ui/icons/Edit';

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


export const getColumns = (buttonProps, role) => {
  const isAdmin = role === "Admin";

  return [
    { title: 'Book title', field: 'title', type: 'string' },
    { title: 'Author', field: 'author', type: 'string' },
    // { title: 'Book Owner', field: 'bookOwner' },
    { title: 'Status', field: 'status', type: 'string' },
    ...(!isAdmin? [{
      title: 'Issue', field: 'issue',
      render: (rowData) => {
        const canBeIssued = true;

        return (
          <Fragment>
            {canBeIssued && (
              <PrimaryButton
                content="Issue"
                onClick={(e) => {
                  buttonProps.onClick(e, rowData);
                }}
              />
            )}
          </Fragment>
        );
      }
    }]: [] ),

    ...(isAdmin? [{
      title: 'Action', field: 'delete',
      render: () => {
        return (
          <Fragment>
           <DeleteForeverIcon
            style={{ cursor: 'pointer' }}
           />
           <EditIcon
            style={{ marginLeft: 5 ,cursor: 'pointer' }}
           />
          </Fragment>
        );
      }
    }]: [] ),
  ]
};
