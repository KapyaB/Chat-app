import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initSocket, openWidget, load1o1Chat } from '../actions/chat';
import { loadUsers } from '../actions/auth';
import ChatWidget from './chat/ChatWidget';

const socketUrl = 'http://192.168.56.1:5000/'; // server url (here i used network ip it can as well be 'localhost:5000)

const Chat = ({
  initSocket,
  chat: { socket, displayWidget },
  authState: { isAuthenticated, user, users },
  loadUsers,
  openWidget,
  load1o1Chat
}) => {
  useEffect(() => {
    loadUsers();
  }, []);

  if (user && !socket) {
    initSocket(io, socketUrl, user && user._id);
  }

  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  }
  return (
    user && (
      <div className="chat-page">
        <div className="correspondents">
          {users &&
            users.map(corres => (
              <span key={corres._id} className="correspondent-choice">
                <button
                  className="corres-btn"
                  onClick={() => {
                    openWidget(true);
                    load1o1Chat(user._id, corres, socket);
                  }}
                >
                  {corres.username}
                </button>
              </span>
            ))}
        </div>
        {displayWidget && <ChatWidget socket={socket} />}
      </div>
    )
  );
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
  { initSocket, loadUsers, openWidget, load1o1Chat }
)(Chat);
