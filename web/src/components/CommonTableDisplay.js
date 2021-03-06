import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Table from '../components/Table';
import TabView from '../components/TabView';
import { getColumns } from '../utils/mockData';
import PrimaryButton from '../components/PrimaryButton';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import { getBooks, createIssue, getIssues, logout, getMyIssues, returnBook } from '../apiMethods';
import { isAdmin } from '../utils/commonUtils';
import img from '../../src/images/background.JPG';

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

const ButtonContainerLogout = styled.div`
  position: absolute;
  right: 40px;
  top: 85px;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 65px;
  justify-content: flex-end;
`;

const Header = styled.div`
  /* margin-top: 100px; */
`;

const UserName = styled.div`
  color: white;
  height: 20px;
  margin-left: 100px;
  /* margin-top: 10px; */
`;

const TextContainer = styled.div`
  position: absolute;
  margin-top: 2px;
  margin-left: -40px;
  font-size: 30px;
`;

const Container = styled.div`
  background-image: url(${img});
  background-size: contain;
  padding-bottom:50px;
`;


export default (props) => {
  const { user, role, response, setIsAddBookModalOpen, isModalOpen, setIsModalOpen, rep, setResponse } = props;
  const [allBooks, setAllBooks] = useState([]);
  const [myIssues, setMyIssues] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  // const [allIssues, setAllIssues] = useState([]);
  const [tab, setTab] = useState([]);
  const [currentRow, setCurrentRow] = useState([]);
  const isSubscribed = useRef();

  const mapAllBookData = (dataSource) => {
    if (dataSource.length > 0) {
      return dataSource.map(book => {
        return {
          id: book._id,
          isbn: book.isbn,
          categories: book.categories && book.categories.length > 0
          ? book.categories.reduce((category1, category2) => {
            return `${category1}, ${category2}`;
          })
          : '',
          avail: book.quantity - book.issues.length > 0 ? 'Available' : 'Not Available',
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

  const mapIssuedBookData = (dataSource) => {
    if (dataSource.length > 0 && myBooks.length > 0) {
      return dataSource.map(book => {
        const relatedBook = myBooks.find((b) => {
          return b._id === book.bookId
        });
        if(relatedBook) {
          return {
            issueId: book._id,
            bookId: book.bookId,
            isbn: relatedBook.isbn,
            categories: relatedBook.categories,
            title: relatedBook.title,
            author: relatedBook.authors && relatedBook.authors.length > 0
              ? relatedBook.authors.reduce((author1, author2) => {
                return `${author1}, ${author2}`;
              })
              : '',
            status: '',
            // Check this
            issueStatus: '',
            // issue: 'issue',
          }
        }
        return;
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
      setAllBooks(response.data.data);
      setMyBooks(userBooks);
    }
  };

  const getIssues = async () => {
    const response = await getMyIssues();
    if (isSubscribed.current) {
      setMyIssues(response.data.data);
    }
  };

  useEffect(() => {
    isSubscribed.current = true;
    getAllBooks();
    getIssues();

    return () => {
      isSubscribed.current = false;
    };
  }, [rep]);

  const buttonProps = {
    onDelete: (e, rowData) => {
      console.log('onDelete', rowData);
    },
    onEdit: (e, rowData) => {
      console.log('onEdit', rowData);
    },
    onIssue: (e, rowData) => {
      setIsModalOpen(true);
      setCurrentRow(rowData);
    },
    onReturn: (e, rowData) => {
      returnBook(rowData.issueId).then((response)=> {
        setResponse(response);
      });
    },
  };

  let userTabs = [{
    tab: 'All books',
    key: 'allBooks',
    content: (
      <Fragment>
        {isAdmin(role) && (<ButtonContainer>
          <PrimaryButton
            content="Add Book"
            onClick={() => {
              setIsAddBookModalOpen(true);
            }}
          />
        </ButtonContainer>)}
        <Table
          dataSource={mapAllBookData(allBooks)}
          columns={getColumns(buttonProps, role, 'allBooks')}
          title="All books"
        />
      </Fragment>
    ),
  }];
  if (!isAdmin(role)) {
    userTabs = userTabs.concat({
      tab: 'Issued books',
      key: 'issuedBooks',
      content: (
        <Table
          // Filter this data
          dataSource={mapIssuedBookData(myIssues)}
          columns={getColumns(buttonProps, role, 'issuedBooks')}
        />
      ),
    });
  }

  return (
    <Fragment>
      <Container>
        <Header>
          <UserName>
            <TextContainer>
              Hello {role === 'Admin' ? 'Admin' : user.fname}!
          </TextContainer>
          </UserName>
          <ButtonContainerLogout>
            <PrimaryButton
              content="Logout"
              onClick={() => {
                logout().then((res) => {
                  window.location = '/';
                });

              }}
            />
          </ButtonContainerLogout>
        </Header>
        <TabView
          tabs={userTabs}
          onChange={(val) => {
            setTab(val);
          }}
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
                    createIssue(currentRow.id, user.id, ONE_MONTH_LATER_DATE).then((response) => {
                      setResponse(response);
                    });
                    setIsModalOpen(false);
                  }}
                />
              </IssueButtonContainer>
            </Fragment>
          </Modal>
        )}
      </Container>
    </Fragment>
  );
}
