import React from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';

export default (props) => {
  const { disabled = false } = props;
  const dateFormat = 'YYYY/MM/DD';


  return (
    <DatePicker
      defaultValue={moment('2015/01/01', dateFormat)}
      format={dateFormat}
      disabled={disabled}
    />
  );
}

