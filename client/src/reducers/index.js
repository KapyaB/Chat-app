import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import chat from './chat';

export default combineReducers({ form: formReducer, chat });
