import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';

import Table from '../components/Table';
import { getRows, getColumns } from '../utils/mockData';
import CommonTableDisplay from '../components/CommonTableDisplay';
import PrimaryButton from '../components/PrimaryButton';
import Modal from '../components/Modal';
import { Input } from 'antd';
import { createBook } from '../apiMethods';


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
export default () => {
  const dataSource = getRows();
  const columns = getColumns();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const inputRef = useRef();
  const [response, setResponse] = useState(null);

  const userTabs = [{
    tab: 'All books',
    key: 1,
    content: (
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    ),
  }, {
    tab: 'Employers',
    key: 2,
    content: (
      <Table
        // Filter this data
        dataSource={dataSource}
        columns={columns}
      />
    ),
  }];


  return (
    <Fragment>
      <ButtonContainer>
        <PrimaryButton
          content="Add Book"
          onClick={() => {
            setIsAddBookModalOpen(true);
          }}
        />
      </ButtonContainer>
      <CommonTableDisplay
        role="Admin"
        response={response}
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
            <Input
              placeholder="Add ISBN"
              onChange={(e) => {
                inputRef.current = e.target.value;
              }}
            />
            <AddButtonContainer>
              <PrimaryButton
                content="Add Book"
                onClick={() => {
                  createBook(inputRef.current).then((response) => {
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
