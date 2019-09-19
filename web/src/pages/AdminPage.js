import React, { Fragment, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import CommonTableDisplay from '../components/CommonTableDisplay';
import PrimaryButton from '../components/PrimaryButton';
import Modal from '../components/Modal';
import { Input, InputNumber } from 'antd';
import { createBook, getBooks, getIssues } from '../apiMethods';
import IManageLogo from '../images/Imanagelogo';


const AddButtonContainer = styled.div`
  text-align: right;
  margin: 10px;
`;

const LogoContainer = styled.div`
  /* position: absolute; */
  left: 0;
  margin-top: -48px;
  top: 0;
  height: 125px;
  width: 100%;
  background: white;
`;


export default (props) => {
  const { user } = props;

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const inputRef = useRef();
  const noOfBookRef = useRef(1);
  const [response, setResponse] = useState(null);

  const [allBooks, setAllBooks] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
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

  // const userTabs = [{
  //   tab: 'All books',
  //   key: 1,
  //   content: (
  //     <Table
  //       dataSource={dataSource}
  //       columns={columns}
  //     />
  //   ),
  // }, {
  //   tab: 'Employers',
  //   key: 2,
  //   content: (
  //     <Table
  //       // Filter this data
  //       dataSource={dataSource}
  //       columns={columns}
  //     />
  //   ),
  // }];


  return (
    <Fragment>
      <LogoContainer>
        <IManageLogo />
      </LogoContainer>
      <CommonTableDisplay
        role="Admin"
        response={response}
        user={user}
        setIsAddBookModalOpen={
          (value) => {
            setIsAddBookModalOpen(value);
          }
        }
      />

      {isAddBookModalOpen && (
        <Modal
          title="Add Book"
          visible={isAddBookModalOpen}
          onCancel={() => {
            setIsAddBookModalOpen(false);
          }}
        >
          <Fragment>
            <div style={{ marginTop: 5 }}>Add ISBN no of Book:</div>
            <Input
              placeholder="Add ISBN"
              onChange={(e) => {
                inputRef.current = e.target.value;
              }}
            />
            <div style={{ marginTop: 20 }}>No of books:</div>
            <InputNumber
              placeholder="No of Books"
              min={1}
              defaultValue={1}
              onChange={(e) => {
                noOfBookRef.current = e;
              }}
            />
            <AddButtonContainer>
              <PrimaryButton
                content="Add Book"
                onClick={() => {
                  createBook({
                    isbn: inputRef.current,
                    quantity: noOfBookRef.current
                  }).then((response) => {
                    setResponse(response);
                  });
                  setIsAddBookModalOpen(false);
                }}
              />
            </AddButtonContainer>
          </Fragment>
        </Modal>
      )}
    </Fragment>
  );
}
