import React, { useState } from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';

export default (props) => {
  const { disabled = false, defaultValue = new Date() } = props;
  const [value, setValue] = useState(defaultValue);
  // const dateFormat = getLocaleDateString();
  const dateFormat = 'YYYY/MM/DD';


  return (
    <DatePicker
      defaultValue={moment(value.toLocaleDateString(), dateFormat)}
      value={moment(value, dateFormat)}
      format={dateFormat}
      disabled={disabled}
      onChange={(date, dateString) => {
        // console.log(date, dateString);
      }}
    />
  );
}

