import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Table from '../components/Table';
import { getColumns } from '../utils/mockData';
import PrimaryButton from '../components/PrimaryButton';
import { getBooks, createIssue, getIssues, logout } from '../apiMethods';
import CommonTableDisplay from '../components/CommonTableDisplay';

const date = new Date();
const ONE_MONTH_LATER_DATE = new Date(date.setDate(date.getDate() + 30));
const IssueBook = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
`;

const IssueButtonContainer = styled.div`
  text-align: right;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: right;
  margin-right: 40px;
  margin-top: 40px;
  justify-content: flex-end;
`;

export default (props) => {
  const { user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [allBooks, setAllBooks] = useState([], getAllBooks());
  const [allBooks, setAllBooks] = useState([]);
  const [issues, setAllIssues] = useState([]);
  const [currentRow, setCurrentRow] = useState([]);
  const isSubscribed = useRef();

  const mapBookData = (dataSource) => {
    if (dataSource.length > 0) {
      return dataSource.map(book => {
        return {
          id: book._id,
          isbn: book.isbn,
          categories: book.categories,
          title: book.title,
          author: book.authors && book.authors.length > 0
            ? book.authors.reduce((author1, author2) => {
              return `${author1}, ${author2}`;
            })
            : '',
          status: '',
          // Check this
          issueStatus: '',
          // issue: 'issue',
        }
      });
    }
    return [];
  }

  const getAllBooks = async () => {
    const response = await getBooks();
    if (isSubscribed.current) {
      setAllBooks(response.data.data);
    }
  };
  const getAllIssues = async () => {
    const response = await getIssues();
    if (isSubscribed.current) {
      console.log(response.data.data);
      setAllIssues(response.data.data);
    }
  };

  useEffect(() => {
    isSubscribed.current = true;
    getAllBooks();
    getAllIssues();

    return () => {
      isSubscribed.current = false;
    };
  }, []);

  const buttonProps = {
    onClick: (e, rowData) => {
      setIsModalOpen(true);
      setCurrentRow(rowData);
      // getBooks().then(response => {
      //   console.log(response.data.data);
      // });
      // getIssues().then(response => {
      //   console.log(response.data.data);
      // });
      // createBook(9788184003482).then(response => {
      //   console.log(response.data.data);
      // });;
    },
  };

  const userTabs = [{
    tab: 'All books',
    key: 1,
    content: (
      <Table
        dataSource={mapBookData(allBooks)}
        columns={getColumns(buttonProps)}
        title="All books"
      />
    ),
  }, {
    tab: 'Issued books',
    key: 2,
    content: (
      <Table
        // Filter this data
        dataSource={mapBookData(allBooks)}
        columns={getColumns(buttonProps)}
      />
    ),
  }];

  return (
    <div>
      <ButtonContainer>
        <PrimaryButton
          content="Logout"
          onClick={() => {
            logout().then((res) => {
              window.location = '/';
            });

          }}
        />
      </ButtonContainer>
    <CommonTableDisplay
      role="User"
      user={user}
    />
    </div>
  );
}
