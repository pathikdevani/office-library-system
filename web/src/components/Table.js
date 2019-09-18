import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';



const TableWrapper = styled.div`
  margin: 50px;
  border: 1px solid grey;
  padding: 5px;
`;

export default React.memo((props) => {
  const { dataSource, columns, title, } = props;
  console.log('table', dataSource);
  const [rows, setRows] = useState(dataSource);
  console.log('dataSource');
  useEffect(() => {
    debugger;
    setRows(dataSource.map(book => {
      return {
        title: book.title,
        author: book.authors.reduce((author1, author2) => {
          return `${author1}, ${author2}`;
        } )
      }
    }));
  }, [dataSource]);

  return (
    <TableWrapper>
      <MaterialTable
        title={title}
        columns={columns}
        data={rows}
        editable={{
          onRowAdd: () => {},
          //  newData =>
            // new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve();
            //     const data = [...state.data];
            //     data.push(newData);
            //     setState({ ...state, data });
            //   }, 600);
            // }
            // ),
          onRowUpdate: (newData, oldData) => {},
            // new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve();
            //     const data = [...state.data];
            //     data[data.indexOf(oldData)] = newData;
            //     setState({ ...state, data });
            //   }, 600);
            // }),
          onRowDelete: oldData => {},
            // new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve();
            //     const data = [...state.data];
            //     data.splice(data.indexOf(oldData), 1);
            //     setState({ ...state, data });
            //   }, 600);
            // }),
        }}
      />
    </TableWrapper>
  );
})
