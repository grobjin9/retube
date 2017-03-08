import React from 'react';
import Header from './containers/Header';
import NavBar from './containers/NavBar';
import store from './reducers/store';
import { userAuthCheckRequest, authenticateUser } from './actions/authActions';
import { updateUser } from './actions/userActions';

class App extends React.Component {
  
  static onEnter(nextState, replace, callback) {
    const { getState, dispatch } = store;
    const { auth, user } = getState();
    const { pathname } = nextState.location;

    if (auth.isAuthenticated && pathname === '/login') replace('/') && callback();

    if (!auth.isAuthenticated && !auth.error || auth.isAuthenticated && !user.id) {
      dispatch(userAuthCheckRequest())
        .then(user => {
          dispatch(authenticateUser());
          dispatch(updateUser(user.data));

          replace(pathname);
          callback();
        })
        .catch(error => {
          dispatch(authenticateUser(error.message));
          replace('/login');
          callback();
        });
    } else {
      callback();
    }
  }

  render() {
    const isLoginPath = this.props.children.props.route.path === '/login';

    return (
      <div className="wrapper">
        <Header />
        <div className="container">
          <div className="row wrap-1">
            <NavBar />
            <div className={`col-md-${isLoginPath ? 12 : 11} expand-height`}>
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;