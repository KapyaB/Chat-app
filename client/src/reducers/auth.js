import { SIGN_UP, SIGN_IN, SIGN_OUT, AUTH_ERROR } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMsg: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

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
