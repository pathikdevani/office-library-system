import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Table from '../components/Table';
import TabView from '../components/TabView';
import { getColumns } from '../utils/mockData';
import PrimaryButton from '../components/PrimaryButton';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import { getBooks, createIssue, getIssues } from '../apiMethods';

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


export default (props) => {
  const { user, role, response } = props;
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
  }, [response]);

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
    <Fragment>
      <div>{role}</div>
      <TabView
        tabs={userTabs}
      />

      {isModalOpen && (
        <Modal
          title="Issue Book"
          visible={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <Fragment>
            <IssueBook>
              <div>From Date</div>
              <DatePicker
                disabled={true}
                defaultValue={new Date()}
              />
              <div>To Date</div>
              <DatePicker
                defaultValue={ONE_MONTH_LATER_DATE}
              />
            </IssueBook>
            <IssueButtonContainer>
              <PrimaryButton
                content="Issue Book"
                onClick={(toDate) => {
                  createIssue(currentRow.id, user.id, ONE_MONTH_LATER_DATE);
                }}
              />
            </IssueButtonContainer>
          </Fragment>
        </Modal>
      )}
    </Fragment>
  );
}
