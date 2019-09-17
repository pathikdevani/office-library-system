import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Splash from './components/Splash';
import GlobalStyle from './global.style';
import Loading from './components/utils/Loading';
import userRequests from './requests/user.requests';
import authActions from './actions/auth.actions';
import globalActions from './actions/global.actions';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  float: left;
  pointer-events: auto;
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
  } = props;

  useEffect(() => {
    userRequests
      .isSingedIn()
      .then((user) => {
        setCurrentUser(user);
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
        <Loading show={loading} />
        <Container show={loading}>
          <Router>
            <Fragment>
              <Switch>
                <Route component={UserPage} path="/user" />
                <Route component={AdminPage} path="/admin" />
                {/* <ProtectedRoute
                  path="/login"
                  exact
                  component={Login}
                  noAuth
                  to="/"
                />
                <ProtectedRoute path="/" component={Dashboard} to="/login" /> */}
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
});

export default connect(mapStateToProps, {
  setCurrentUser: authActions.setCurrentUser,
  setGlobalSplash: globalActions.setGlobalSplash,
})(App);
