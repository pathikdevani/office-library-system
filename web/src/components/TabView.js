import React, { Fragment } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default (props) => {
  const {tabs} =  props;
  // State?


  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
      // onChange={callback}
      >
        {tabs.map(tab => (
          <TabPane
            tab={tab.tab}
            key={tab.key}
          >
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    </Fragment>
  );
}
