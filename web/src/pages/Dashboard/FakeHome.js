import React from 'react';
import { Tabs, Icon, Button } from 'antd';
import styled from 'styled-components';

const { TabPane } = Tabs;
const operations = <Button>+Add</Button>;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
`;

function Fake() {
  return (
    <Container>
      {' '}
      <Tabs style={{ padding: 20, background: 'white' }} defaultActiveKey="1" tabBarExtraContent={operations}>
        <TabPane
          tab={(
            <span>
              <Icon type="apple" />
              <span>Apps</span>
            </span>
          )}
          key="1"
        >
          <span>test</span>
        </TabPane>
        <TabPane
          tab={(
            <span>
              <Icon type="android" />
              <span>Builds</span>
            </span>
          )}
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={(
            <span>
              <Icon type="android" />
              <span>Versions</span>
            </span>
          )}
          key="3"
        >
          Tab 2
        </TabPane>
      </Tabs>

    </Container>

  );
}

export default Fake;
