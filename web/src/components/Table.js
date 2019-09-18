import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const TableWrapper = styled.div`
  margin: 50px;
  border: 1px solid grey;
  padding: 5px;
`;

export default React.memo((props) => {
  const { dataSource, columns, title, } = props;
  const [rows, setRows] = useState(dataSource);

  useEffect(() => {
    if(dataSource.length > 0) {
      setRows(dataSource);
    }
  }, [dataSource]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  return (
    <TableWrapper>
      <MaterialTable
        title={title}
        columns={columns}
        data={rows}
        icons={tableIcons}
      // editable={{
      //   onRowAdd: () => {},
      //   //  newData =>
      //     // new Promise(resolve => {
      //     //   setTimeout(() => {
      //     //     resolve();
      //     //     const data = [...state.data];
      //     //     data.push(newData);
      //     //     setState({ ...state, data });
      //     //   }, 600);
      //     // }
      //     // ),
      //   onRowUpdate: (newData, oldData) => {},
      //     // new Promise(resolve => {
      //     //   setTimeout(() => {
      //     //     resolve();
      //     //     const data = [...state.data];
      //     //     data[data.indexOf(oldData)] = newData;
      //     //     setState({ ...state, data });
      //     //   }, 600);
      //     // }),
      //   onRowDelete: oldData => {},
      //     // new Promise(resolve => {
      //     //   setTimeout(() => {
      //     //     resolve();
      //     //     const data = [...state.data];
      //     //     data.splice(data.indexOf(oldData), 1);
      //     //     setState({ ...state, data });
      //     //   }, 600);
      //     // }),
      // }}
      />
    </TableWrapper>
  );
})
