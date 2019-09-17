import React from 'react';
import { Empty } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;

  > div {
    border: 1px solid #e3e3e3;
    border-radius: 5px;
  }
`;

function MyEmpty() {
  return (
    <Container>
      <div>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    </Container>
  );
}

export default MyEmpty;
