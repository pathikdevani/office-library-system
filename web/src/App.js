import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Splash from './components/Splash';
import GlobalStyle from './global.style';
import Loading from './components/utils/Loading';
import userRequests from './requests/user.requests';
import authActions from './actions/auth.actions';
import globalActions from './actions/global.actions';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import img from '../src/images/login.JPG';


const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  float: left;
  pointer-events: auto;
  background-image: url(${img});
  background-size: contain;
  opacity: 1;

  ${({ show }) => show && css`
    pointer-events: none;
    opacity: .2;
  `}
`;

function App(props) {
  const {
    loading,
    setCurrentUser,
    setGlobalSplash,
    splash,
    // user,
  } = props;
  const [isLogin , setIsLogin] = useState(true);
  useEffect(() => {
    userRequests
      .isSingedIn()
      .then((user) => {
        setIsLogin(true);
        setCurrentUser(user.data);
      })
      .finally(() => {
        setGlobalSplash(false);
      });
  }, []);

  let render = null;
  if (splash) {
    render = <Splash />;
  } else {
    render = (
      <Fragment>
        <Loading show={loading} isLogin={isLogin} />
        <Container show={loading}>
          <Router>
            <Fragment>
              <Switch>
                <ProtectedRoute
                  path="/login"
                  exact
                  component={Login}
                  noAuth
                  to="/"
                />
                <ProtectedRoute path="/" component={Dashboard} to="/login" />
              </Switch>
            </Fragment>
          </Router>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <GlobalStyle />
      {render}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  loading: state.global.loading,
  splash: state.global.splash,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  setCurrentUser: authActions.setCurrentUser,
  setGlobalSplash: globalActions.setGlobalSplash,
})(App);
