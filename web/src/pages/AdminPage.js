import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';

import CommonTableDisplay from '../components/CommonTableDisplay';
import PrimaryButton from '../components/PrimaryButton';
import Modal from '../components/Modal';
import { Input, InputNumber } from 'antd';
import { createBook, logout } from '../apiMethods';
import Imanagelogo from '../images/Imanagelogo';


const AddButtonContainer = styled.div`
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

const LogoContainer = styled.div`
  position: absolute;
  left: 0;
  margin-top: -48px;
  top: 0;
`;

export default (props) => {
  const { user } = props;
  // const dataSource = getRows();
  // const columns = getColumns();

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const inputRef = useRef();
  const noOfBookRef = useRef(1);
  const [response, setResponse] = useState(null);

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
      <ButtonContainer>
        <LogoContainer>
          <Imanagelogo/>
        </LogoContainer>
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
        role="Admin"
        response={response}
        user={user}
        setIsAddBookModalOpen={
          (value)=>{
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
          <div style={{marginTop:5}}>Add ISBN no of Book:</div>
            <Input
              placeholder="Add ISBN"
              onChange={(e) => {
                inputRef.current = e.target.value;
              }}
            />
            <div style={{marginTop:20}}>No of books:</div>
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
