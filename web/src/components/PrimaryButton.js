import React, { Fragment } from 'react';
import { Button } from 'antd';


export default (props) => {
  const { onClick, content } = props;
  return (
    <Fragment>
      <Button
        type="primary"
        onClick={onClick}
      >
        {content}
      </Button>
    </Fragment>
  );
}
