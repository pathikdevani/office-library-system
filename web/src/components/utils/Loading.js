import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Spin, Icon } from 'antd';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(145, 213, 255, .1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #1890ff;
  font-weight: 600;
  pointer-events: none;
  opacity: 0;
  transition: opacity .3s ease-out;

  ${({ show }) => show && css`
    pointer-events: auto;
    opacity: 1;
  `}
`;

const FocusElement = styled.div`
  opacity: 0;
  height: 0;
  width: 0;
  position: absolute;
`;


function Loading(props) {
  const { show } = props;
  const focusRef = useRef();

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (show) {
      focusRef.current.focus();
    }
  }, [show]);

  return (
    <Container
      show={show}
    >
      <Spin
        size="large"
        indicator={antIcon}
      />
      <div>Loading...</div>
      <FocusElement
        ref={focusRef}
        tabIndex="-1"
      />
    </Container>
  );
}

export default Loading;
