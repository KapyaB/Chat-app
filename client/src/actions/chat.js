import { SET_SOCKET } from './types';

export const initSocket = (io, socketUrl) => dispatch => {
  const socket = io(socketUrl);
  // socket has connected
  socket.on('connect', () => console.log('Socket connection established'));

  dispatch({
    type: SET_SOCKET,
    payload: socket
  });
};
