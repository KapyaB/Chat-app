import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMsg, load1o1Chat } from '../../actions/chat';

const ChatWidget = ({
  authState: { user },
  chat: { privateMsgs, correspondent },
  sendMsg,
  socket
}) => {
  const [msg, setMsg] = useState({ msg: '' });
  const handleChange = e => {
    setMsg({ ...msg, msg: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMsg({ msg: '' });
    sendMsg(correspondent, msg.msg, socket);
  };

  return (
    <div className="chat-widget">
      <div className="widget-head">{correspondent.name}</div>
      <div className="chat-container">
        {privateMsgs.map(msg => (
          <div key={msg._id} className="msg-container">
            <small className="msg-sender">
              {msg.sender.id === user._id ? 'You' : msg.sender.username}
            </small>
            <p className="msg">{msg.msg}</p>
          </div>
        ))}
      </div>
      <form className="msg-form" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          className="msg-input"
          placeholder="type your message..."
          value={msg.msg}
          onChange={e => handleChange(e)}
        />

        <input type="submit" className="submit-btn" value="Send" />
      </form>
    </div>
  );
};

ChatWidget.propTypes = {};

const mapStateToProps = state => ({
  authState: state.auth,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { sendMsg, load1o1Chat }
)(ChatWidget);
