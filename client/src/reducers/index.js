import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import chat from './chat';
import auth from './auth';

export default combineReducers({ form: formReducer, chat, auth });
