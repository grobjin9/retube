import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import axios from 'axios';

// Heroku fix
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

// Store
import store from './js/reducers/store';

// Routes
import App from './js/App';
import LoginForm from './js/containers/LoginForm';
import Rooms from './js/containers/Rooms';
import Chatbox from './js/containers/Chatbox';

// Styles
import './styles/main.scss';

render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} onEnter={App.onEnter}>
        <IndexRedirect to="/rooms"/>

        <Route path="rooms" component={Rooms} onEnter={Rooms.onEnter} >
          <Route path=":chatroomId" component={Chatbox} />
        </Route>

        <Route path="/login" component={LoginForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);