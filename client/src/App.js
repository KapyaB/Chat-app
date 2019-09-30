import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/layout/Navbar';
import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

function App(props) {
  const {
    authState: { token }
  } = props;

  useEffect(() => {
    token && props.loadUser();
  }, []);
  return (
    <div className="App">
      <Navbar />
      {props.children}
    </div>
  );
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(App);
