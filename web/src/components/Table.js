import React from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';



const TableWrapper = styled.div`
  margin: 50px;
  border: 1px solid grey;
  padding: 5px;
`;

export default (props) => {
  const { dataSource, columns, } = props;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Book title', field: 'name' },
      { title: 'Author', field: 'name' },
      { title: 'Book Owner', field: 'birthYear' },
      { title: 'Issue', field: '', type: 'button' },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <TableWrapper>
      <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data.push(newData);
                    setState({ ...state, data });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data[data.indexOf(oldData)] = newData;
                    setState({ ...state, data });
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data.splice(data.indexOf(oldData), 1);
                    setState({ ...state, data });
                  }, 600);
                }),
            }}
          />
    </TableWrapper>
  );
}
