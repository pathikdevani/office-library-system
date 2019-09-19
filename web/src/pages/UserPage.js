import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import Table from '../components/Table';
import { getColumns } from '../utils/mockData';
import { getBooks, getMyIssues } from '../apiMethods';
import CommonTableDisplay from '../components/CommonTableDisplay';
import IManageLogo from '../images/Imanagelogo';

const date = new Date();

const LogoContainer = styled.div`
  /* position: absolute; */
  left: 0;
  margin-top: -48px;
  top: 0;
  height: 125px;
  width: 100%;
  background: white;
`;

const role = 'user';


export default (props) => {
  const { user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [allBooks, setAllBooks] = useState([], getAllBooks());
  const [allBooks, setAllBooks] = useState([]);
  const [myIssues, setMyIssues] = useState([]);
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
      const userBooks = response.data.data.filter((book, i) => {
        const userHasBook = book.issues.filter(issue => issue.userId === user.id && !issue.isReturned).length > 0
        return userHasBook;
      });
      debugger;
      setMyIssues(userBooks);
      setAllBooks(response.data.data);
    }
  };
  // console.log(myIssues);
  const getUserIssues = async () => {
    const response = await getMyIssues();
    if (isSubscribed.current) {
      // setMyIssues(response.data.data);
    }
  };

  useEffect(() => {
    isSubscribed.current = true;
    getAllBooks();
    // getUserIssues();

    return () => {
      isSubscribed.current = false;
    };
  }, []);

  const buttonProps = {
    onDelete:(e, rowData) => {
      console.log('onDelete', rowData);
    },
    onEdit:(e, rowData) => {
      console.log('onEdit', rowData);
    },
    onIssue: (e, rowData) => {
      setIsModalOpen(true);
      // setCurrentRow(rowData);
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
        columns={getColumns(buttonProps, role)}
        title="All books"
      />
    ),
  }, {
    tab: 'Issued books',
    key: 2,
    content: (
      <Table
        // Filter this data
        dataSource={mapBookData(myIssues)}
        columns={getColumns(buttonProps, role)}
      />
    ),
  }];

  return (
    <div>
      <LogoContainer>
        <IManageLogo />
      </LogoContainer>
      <CommonTableDisplay
        tabs={userTabs}
        role="User"
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
