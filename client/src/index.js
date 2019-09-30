import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';
import App from './App';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Chat from './components/Chat';
import reducers from './reducers';

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      composeWithDevTools(applyMiddleware(reduxThunk))
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/chats" component={Chat} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
