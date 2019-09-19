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
        setResponse={setResponse}
        rep={response}
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
