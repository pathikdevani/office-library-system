import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: white;
`;

function Splash() {
  return (
    <Container />
  );
}

export default Splash;
