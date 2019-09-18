import React, { Fragment, useState, useEffect, useRef } from 'react';
import Table from '../components/Table';
import TabView from '../components/TabView';
import { getRows, getColumns } from '../utils/mockData';
import IssueButton from '../components/IssueButton';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import { getBooks, getIssues, createBook } from '../apiMethods';


export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [allBooks, setAllBooks] = useState([], getAllBooks());
  const [allBooks, setAllBooks] = useState([]);
  const isSubscribed = useRef();

  const getAllBooks = async () => {
    const response = await getBooks();
    if (isSubscribed.current) {
      setAllBooks(response.data.data);
    }
  };

  useEffect(() => {
    isSubscribed.current = true;
    getAllBooks();

    return () => {
      isSubscribed.current = false;
    };
  }, []);

  const dataSource = getRows();
  dataSource.forEach((data => {
    // Change it when data from server
    const canBeIssued = true;
    if (canBeIssued) {
      data.issue = (
        <IssueButton
          data={data}
          openModal={() => {
            // setIsModalOpen(true);
            getBooks().then(response => {
              console.log(response.data.data);
            });
            // getIssues().then(response => {
            //   console.log(response.data.data);
            // });
            // createBook(9788184003482).then(response => {
            //   console.log(response.data.data);
            // });;
          }}
        />
      )
    }
  }));
  const columns = getColumns();

  const userTabs = [{
    tab: 'All books',
    key: 1,
    content: (
      <Table
        dataSource={allBooks}
        columns={getColumns()}
        title="All books"
      />
    ),
  }, {
    tab: 'Issued books',
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
      <div>User</div>
      <TabView
        tabs={userTabs}
      />

      {isModalOpen && (
        <Modal
          visible={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <Fragment>
            <div>From Date</div>
            <DatePicker
              disabled={true}
            />
            <div>To Date</div>
            <DatePicker />
          </Fragment>
        </Modal>
      )}
    </Fragment>
  );
}
