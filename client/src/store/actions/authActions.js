import axiosInstance from '../../axios';
import * as actionTypes from './actionTypes';


// AUTHENTICATE

export const refreshAuthenticate = () => {
  const data = JSON.parse(localStorage.getItem('bookmarksData'));
  return {
    type: actionTypes.AUTHENTICATE,
    data
  };
};

const loadAuthenticate = data => {
  return {
    type: actionTypes.AUTHENTICATE,
    data
  };
};


// helper function for retrieving token on LOGIN and REGISTER

const obtainToken = async (dispatch, authData) => {
  const response = await axiosInstance.post('/api/token/obtain/', authData);

  const data = {
    username: authData.username,
    isAuthenticated: !!response.data.access,
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  };

  dispatch(loadAuthenticate(data));
  localStorage.setItem('bookmarksData', JSON.stringify(data));
};


// LOGIN

export const startLogin = authData => {
  return dispatch => {
    return obtainToken(dispatch, authData);
  };
};


// REGISTER

export const startRegister = authData => {
  return async dispatch => {
    await axiosInstance.post('/register/', authData);
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
