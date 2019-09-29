import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { initSocket } from '../actions/chat';

const socketUrl = 'http://192.168.56.1:5000/'; // server url (here i used network ip it can as well be 'localhost:5000)

const Chat = ({ initSocket, chat: { socket } }) => {
  useEffect(() => {
    initSocket(io, socketUrl);
  }, []);

  return (
    <div>
      Lets Chat!
      {socket && <p>my socket id: {socket.id}</p>}
    </div>
  );
};

Chat.propTypes = {
  initSocket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { initSocket }
)(Chat);
