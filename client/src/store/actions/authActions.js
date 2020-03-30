import axiosInstance from '../../axios';
import * as actionTypes from './actionTypes';


// amount of time our token is valid in miliseconds (current fake data: 1 hour)
const EXPIRATION_TIME = 3600 * 1000;


// AUTHENTICATE

const authSuccess = (username, token) => {
  return { type: actionTypes.AUTH_SUCCESS, username, token };
};

export const authCheckState = () => {
  return dispatch => {

    const userData = JSON.parse(localStorage.getItem('bookmarksData'));

    if (userData) {
      const expirationDate = new Date(userData.expirationDate);

      if (expirationDate > new Date()) {
        dispatch(authSuccess(userData.username, userData.accessToken));
        // dispatch time delta to calculate time our token is valid
        dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
      } else {
      // logout if expiration date is less than current date
        dispatch(logout());
      }
    }
  };
};


// helper function for retrieving token on LOGIN and REGISTER

const obtainToken = async (dispatch, authData) => {
  const response = await axiosInstance.post('/api/token/obtain/', authData);

  // Date object of current time + expiration time in miliseconds
  const expirationDate = new Date(new Date().getTime() + EXPIRATION_TIME);

  const data = {
    username: authData.username,
    accessToken: response.data.access,
    expirationDate
  };

  localStorage.setItem('bookmarksData', JSON.stringify(data));
  dispatch(authSuccess(data.username, data.accessToken));
  dispatch(checkAuthTimeout(EXPIRATION_TIME));
};


export const auth = (authData, method) => {
  return async dispatch => {
    if (method === 'Sign up') {
      await axiosInstance.post('/register/', authData);
    }
    return obtainToken(dispatch, authData);
  };
};


// LOGOUT

export const logout = () => {
  localStorage.removeItem('bookmarksData');
  return {
    type: actionTypes.LOGOUT
  };
};


const checkAuthTimeout = (expirationTimeInMiliSeconds) => {
  /* will automatically logout when token expires */
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      // setTimeout takes time in miliseconds
    }, expirationTimeInMiliSeconds);
  };
};
