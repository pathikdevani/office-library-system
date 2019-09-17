
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
`;

function Dashboard(props) {
  const { user } = props;
  if (!user) {
    return <div>Loading...</div>;
  }
  const page = user.role === 'admin' ? <div>admin page</div> : <div>user page</div>;
  return (
    <Container>
      {page}
    </Container>
  );
}
const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
