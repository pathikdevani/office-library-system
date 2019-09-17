import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute(props) {
  let redirect = null;
  const {
    noRedirect, noAuth, path, component, render, exact,
  } = props;
  const _noRedirect = noRedirect || false;
  const _noAuth = noAuth || false;

  if (!_noRedirect) {
    if (_noAuth && props.authenticated) {
      redirect = (
        <Redirect
          to={{
            pathname: props.to || '/login',
            state: { from: props.location },
          }}
        />
      );
    } else if (!_noAuth && !props.authenticated) {
      redirect = (
        <Redirect
          to={{
            pathname: props.to || '/login',
            state: { from: props.location },
          }}
        />
      );
    }
  }

  if (redirect) {
    return (
      <Route path={props.path} render={() => redirect} exact={props.exact} />
    );
  }

  return (
    <Route path={path} component={component} render={render} exact={exact} />
  );
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
