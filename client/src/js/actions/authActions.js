import axios from 'axios';
import { browserHistory } from 'react-router';

import { SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT_SUCCESS } from '../constants/authConstants';
import { killUser } from './userActions';

export const authenticateUser = function (error = null) {
  return {
    type: error ? SIGNIN_ERROR : SIGNIN_SUCCESS,
    error
  };
};

export const signoutUser = function () {
  return {
    type: SIGNOUT_SUCCESS
  };
};

export const userSignupRequest = (userData) => (dispatch, getState) => {
  return axios.post('/auth/signup', userData);
};

export const userSigninRequest = (userData) => (dispatch, getState) => {
  return axios.post('/auth/signin', userData);
};

export const userSignoutRequest = () => (dispatch, getState) => {
  axios
    .get('/auth/signout')
    .then(() => {
      dispatch(signoutUser());
      dispatch(killUser());

      browserHistory.push('/login');
    })
    .catch((err) => {
      console.log(err);
    })

};

export const userAuthCheckRequest = () => (dispatch, getState) => axios.get('/auth/verify');