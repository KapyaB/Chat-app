import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { initSocket } from '../actions/chat';

const socketUrl = 'http://192.168.56.1:5000/'; // server url (here i used network ip it can as well be 'localhost:5000)

const Chat = ({
  initSocket,
  chat: { socket },
  authState: { isAuthenticated }
}) => {
  useEffect(() => {
    isAuthenticated && initSocket(io, socketUrl);
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  }
  return <div>Lets Chat!</div>;
};

Chat.propTypes = {
  initSocket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { initSocket }
)(Chat);
