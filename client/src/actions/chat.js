import { SET_SOCKET, DISCONNECT_SOCKET } from './types';

// ESTABLISH CONNECTION
export const initSocket = (io, socketUrl, userId) => dispatch => {
  const socket = io.connect(socketUrl, { query: { user: userId } });
  socket.user = userId;
  // socket has connected

  socket.on('connect', () => console.log('Socket connection established'));

  dispatch({
    type: SET_SOCKET,
    payload: socket
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
