import axios from 'axios';
import { SIGN_UP, AUTH_ERROR, SIGN_IN, SIGN_OUT } from './types';
import { disconnectSocket } from './chat';

// sign up
export const signUp = (data, history) => async dispatch => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/signup',
      data
    );

    dispatch({
      type: SIGN_UP,
      payload: res.data
    });
    // save token
    localStorage.setItem('jwtToken', res.token);
    history.push('/chats');
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
      // payload: err.response.statusText
    });
  }
};

// sign in
export const signIn = data => async dispatch => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/signin',
      data
    );

    dispatch({
      type: SIGN_IN,
      payload: res.data
    });
    localStorage.setItem('jwtToken', res.token);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.statusText
    });
  }
};

// sign out
export const signOut = socket => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: SIGN_OUT
  });

  dispatch(disconnectSocket(socket));
};
