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


export const getColumns = (buttonProps, role, tab) => {
  const isAdmin = role === "Admin";

  return [
    { title: 'Book title', field: 'title', type: 'string' },
    { title: 'Author', field: 'author', type: 'string' },
    // { title: 'Book Owner', field: 'bookOwner' },
    { title: 'Categories', field: 'categories', type: 'string' },
    ...(tab === 'allBooks' ? [{
      title: 'Availability', field: 'avail', type: 'string'
    }] : []),
    ...(!isAdmin && tab === 'allBooks' ? [{
      title: 'Issue', field: 'issue',
      render: (rowData) => {
        const canBeIssued = true;

        return (
          <Fragment>
            {canBeIssued && (
              <PrimaryButton
                content="Issue"
                onClick={(e) => {
                  buttonProps.onIssue(e, rowData);
                }}
              />
            )}
          </Fragment>
        );
      }
    }] : []),
    ...(!isAdmin && tab === 'issuedBooks' ? [{
      title: 'Return', field: 'return',
      render: (rowData) => {
        const canBeIssued = true;

        return (
          <Fragment>
            {canBeIssued && (
              <PrimaryButton
                content="Return"
                onClick={(e) => {
                  buttonProps.onReturn(e, rowData);
                }}
              />
            )}
          </Fragment>
        );
      }
    }] : []),

    ...(isAdmin ? [{
      title: 'Action', field: 'delete',
      render: (rowData) => {
        return (
          <Fragment>
            <DeleteForeverIcon
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                buttonProps.onDelete(e, rowData);
              }}
            />
            <EditIcon
              style={{ marginLeft: 5, cursor: 'pointer' }}
              onClick={(e) => {
                buttonProps.onEdit(e, rowData);
              }}
            />
          </Fragment>
        );
      }
    }] : []),
  ]
};
