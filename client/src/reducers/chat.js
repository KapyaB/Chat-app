import { SET_SOCKET } from '../actions/types';

const initialState = {
  socket: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

    case SET_SOCKET:
      return {
        ...state,
        socket: payload
      };
  }
}
