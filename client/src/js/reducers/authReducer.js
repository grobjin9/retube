const { auth } = require('./initialState');
const constants = require('../constants/authConstants');

function authReducer(state = auth, action) {
  switch (action.type) {
    case constants.SIGNIN_SUCCESS:
      return {...state, isAuthenticated: true, error: null};
    case constants.SIGNIN_ERROR:
      return {...state, isAuthenticated: false, error: action.error};

    case constants.SIGNOUT_SUCCESS:
      return {...state, isAuthenticated: false, error: null};
    case constants.SIGNOUT_ERROR:
      return {...state, isAuthenticated: false, error: action.error};

    default:
      return state;
  }
}

export default authReducer;