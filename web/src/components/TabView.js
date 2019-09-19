import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Tabs } from 'antd';


const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  margin-left: 50px !important;
  margin-right: 50px !important;
  margin-top: 30px !important;
  border: 1px solid grey;
  background: rgba(255,255,255,0.9);
`;


export default (props) => {
  const { tabs, onChange } = props;


  return (
    <Fragment>
      <StyledTabs
        defaultActiveKey="1"
        onChange={onChange}
      >
        {tabs.map(tab => (
          <TabPane
            tab={tab.tab}
            key={tab.key}
          >
            {tab.content}
          </TabPane>
        ))}
      </StyledTabs>
    </Fragment>
  );
}
