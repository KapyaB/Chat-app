import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomInput from '../common/CustomInput';
import { signIn } from '../../actions/auth';

const SignIn = ({
  handleSubmit,
  history,
  signIn,
  authState: { isAuthenticated }
}) => {
  const onSubmit = async formData => {
    await signIn(formData, history);
  };

  if (isAuthenticated) {
    return <Redirect to="/chats" />;
  }

  return (
    <div className="signin-page">
      <div className="local-auth">
        <p className="auth-head">
          <i className="fas fa-sign-in-alt"></i> Sign in to your account
        </p>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="email"
            type="text"
            id="email"
            label="Email"
            component={CustomInput}
            placeholder="example@example.com"
            autoComplete="email"
            isRequired
          />
          <Field
            name="password"
            type="password"
            id="password"
            label="Password"
            component={CustomInput}
            placeholder="password"
            autoComplete="new-password"
            isRequired
          />
          <button className="submit-btn" type="submit">
            Sign In
          </button>
        </form>
        <span className="auth-redirect">
          <small>
            <em>Don't have an account? </em>
            <Link to="/signup" className="auth-link">
              Create One
            </Link>
          </small>
        </span>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  authState: PropTypes.object
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default compose(
  connect(
    mapStateToProps,
    { signIn }
  ),
  reduxForm({ form: 'signin' })
)(withRouter(SignIn));
