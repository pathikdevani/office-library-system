import React, { useState } from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';
import { getLocaleDateString } from '../utils/calendarUtils';

export default (props) => {
  const { disabled = false, value = new Date() } = props;
  const [val, setValue] = useState(value);
  // const dateFormat = getLocaleDateString();
  const dateFormat = 'YYYY/MM/DD';
  debugger;


  return (
    <DatePicker
      defaultValue={moment(value.toLocaleDateString(), dateFormat)}
      format={dateFormat}
      disabled={disabled}
    />
  );
}

