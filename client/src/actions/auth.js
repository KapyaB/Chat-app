import axios from 'axios';
import {
  SIGN_UP,
  AUTH_ERROR,
  SIGN_IN,
  SIGN_OUT,
  LOAD_USER,
  LOAD_USERS
} from './types';
import { disconnectSocket } from './chat';

import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users/user');

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// load users (except me)
export const loadUsers = () => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users/users');

    dispatch({
      type: LOAD_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

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
    localStorage.setItem('jwtToken', res.data.token);
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
    localStorage.setItem('jwtToken', res.data.token);
  } catch (err) {
    console.log(err.response);
    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: err.response.statusText
    // });
  }
};

// sign out
export const signOut = socket => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: SIGN_OUT
  });

  socket && dispatch(disconnectSocket(socket));
};
