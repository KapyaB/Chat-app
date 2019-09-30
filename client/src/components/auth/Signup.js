import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { signUp, googleOAuth, facebookOAuth } from '../../actions/auth';
import CustomInput from '../common/CustomInput';

const Signup = ({
  handleSubmit,
  signUp,
  history,
  authState: { isAuthenticated }
}) => {
  // handleSubmit & handleChange passed from redux form
  const onSubmit = async formData => {
    await signUp(formData, history);
  };

  if (isAuthenticated) {
    return <Redirect to="/chats" />;
  }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <p className="auth-head">
          <i className="fas fa-user-plus"></i> Sign up for a new Account
        </p>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Field
              name="username"
              type="text"
              id="name"
              label="Name"
              component={CustomInput}
              placeholder="Your name"
            />
          </fieldset>
          <fieldset>
            <Field
              name="email"
              type="text"
              id="email"
              label="Email"
              component={CustomInput}
              placeholder="example@example.com"
              autoComplete="email"
            />
          </fieldset>

          <fieldset>
            <Field
              name="password"
              type="password"
              id="password"
              label="Password"
              component={CustomInput}
              placeholder="password"
              autoComplete="new-password"
            />
          </fieldset>

          <fieldset>
            <Field
              name="password2"
              type="password"
              id="password2"
              label="Confirm Password"
              component={CustomInput}
              placeholder="re-enter password"
              autoComplete="new-password"
            />
          </fieldset>
          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </form>
        <span className="auth-redirect">
          <small>
            <em>Already have an account? </em>
            <Link to="/signin" className="auth-link">
              Sign In
            </Link>
          </small>
        </span>
      </div>
    </div>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  authState: PropTypes.object
};
const mapStateToProps = state => ({
  authState: state.auth
});

export default compose(
  connect(
    mapStateToProps,
    { signUp }
  ),
  reduxForm({ form: 'signup' })
)(withRouter(Signup));
