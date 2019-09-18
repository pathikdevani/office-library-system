import React, { Fragment } from 'react';
import { Button } from 'antd';


export default (props) => {
  const {data, openModal} = props;
  return (
    <Fragment>
      <Button
        type="primary"
        onClick={() => {
          openModal(data);
        }}
      >
        Issue
        </Button>
    </Fragment>
  );
}
