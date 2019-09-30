import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  AUTH_ERROR,
  LOAD_USER,
  LOAD_USERS
} from '../actions/types';

const initialState = {
  isAuthenticated: localStorage.jwtToken ? true : false,
  user: null,
  users: null,
  token: localStorage.jwtToken || null,
  errorMsg: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

    case LOAD_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        errorMsg: ''
      };

    case LOAD_USERS:
      return {
        ...state,
        users: payload,
        errorMsg: ''
      };

    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        errorMsg: '',
        isAuthenticated: true,
        token: payload.token,
        user: payload.user
      };

    case SIGN_OUT:
      return {
        ...state,
        user: null,
        toekn: null,
        isAuthenticated: false,
        errorMsg: ''
      };

    case AUTH_ERROR:
      return {
        ...state,
        errorMsg: payload
      };
  }
}
