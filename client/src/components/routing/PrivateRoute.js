import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  authState: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Redirect to="/signin" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
