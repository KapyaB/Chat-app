import {
  SET_SOCKET,
  DISCONNECT_SOCKET,
  LOAD_1O1_CHAT,
  SEND_MSG,
  RECEIVE_MSG,
  DISPLAY_WIDGET,
  SET_CORRESPONDENT
} from './types';

// ESTABLISH CONNECTION
export const initSocket = (io, socketUrl, userId) => dispatch => {
  const socket = io.connect(socketUrl, { query: { user: userId } });
  socket.on('connect', () => console.log('Socket connection established'));

  dispatch({
    type: SET_SOCKET,
    payload: socket
  });
};

// open chat widget
export const openWidget = status => dispatch => {
  dispatch({
    type: DISPLAY_WIDGET,
    payload: status
  });
};

// load a 1 on 1 chat
export const load1o1Chat = (userId, correspondent, socket) => dispatch => {
  dispatch({
    type: SET_CORRESPONDENT,
    payload: correspondent
  });

  socket.emit(LOAD_1O1_CHAT, {
    user: userId,
    corres: correspondent._id
  });

  socket.on('LOAD_MSGS', msgs => {
    dispatch({
      type: LOAD_1O1_CHAT,
      payload: msgs
    });
  });
};

// send msg
export const sendMsg = (recepient, msg, socket) => dispatch => {
  socket.emit(SEND_MSG, { msg, recepient }, cbData => {});
};

// receive msg (including one i just sent)
export const receiveMsg = socket => async dispatch => {
  socket.on(RECEIVE_MSG, msg => {
    dispatch({
      type: RECEIVE_MSG,
      payload: msg
    });
  });
};

// DISCONNECT SOCKET
export const disconnectSocket = socket => dispatch => {
  socket.disconnect();
  // socket.emit('disconnect');

  dispatch({
    type: DISCONNECT_SOCKET
  });
};
