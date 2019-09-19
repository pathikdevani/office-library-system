import React, { useState } from 'react';

import styled from 'styled-components';
import CommonTableDisplay from '../components/CommonTableDisplay';
import IManageLogo from '../images/Imanagelogo';

const date = new Date();

const LogoContainer = styled.div`
  /* position: absolute; */
  left: 0;
  margin-top: -48px;
  top: 0;
  height: 125px;
  width: 100%;
  background: white;
`;

const role = 'user';


export default (props) => {
  const { user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div>
      <LogoContainer>
        <IManageLogo />
      </LogoContainer>
      <CommonTableDisplay
        // tabs={userTabs}
        role="User"
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
