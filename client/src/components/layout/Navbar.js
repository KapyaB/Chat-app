import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../../actions/auth';

const Navbar = ({
  signOut,
  authState: { isAuthenticated, user },
  chat: { socket }
}) => {
  const guestLinks = (
    <Fragment>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/" className="nav-link"></Link>
        </li>
      </ul>

      <ul className="nav-items nav-r">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/signin" className="nav-link">
            Sign In
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/chats" className="nav-link">
            Chats
          </Link>
        </li>
      </ul>
      <ul className="nav-items nav-r">
        <li className="nav-item">
          <button
            onClick={() => signOut(socket)}
            className="nav-link sign-out-btn"
          >
            Sign Out
          </button>
        </li>
        <li className="nav-item">{user && <p>{user.username}</p>}</li>
      </ul>
    </Fragment>
  );
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link brand">
        <h2>Chat App</h2>
      </Link>

      <div className="nav-items-container">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = { signOut: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  authState: state.auth,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { signOut }
)(Navbar);
