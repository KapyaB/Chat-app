import {
  SET_SOCKET,
  LOAD_1O1_CHAT,
  RECEIVE_MSG,
  DISPLAY_WIDGET,
  SET_CORRESPONDENT
} from '../actions/types';

const initialState = {
  socket: null,
  user: null,
  privateMsgs: [],
  correspondent: null,
  displayWidget: false
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

    case DISPLAY_WIDGET:
      return {
        ...state,
        displayWidget: payload
      };

    case SET_CORRESPONDENT:
      return {
        ...state,
        correspondent: payload
      };

    case LOAD_1O1_CHAT:
      return {
        ...state,
        privateMsgs: payload
      };

    case RECEIVE_MSG:
      return {
        ...state,
        privateMsgs: [...state.privateMsgs, payload]
      };
  }
}
