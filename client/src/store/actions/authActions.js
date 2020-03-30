import axiosInstance from '../../axios';
import * as actionTypes from './actionTypes';


// AUTHENTICATE

export const loadAuthenticate = (data) => {
  if (!data) data = JSON.parse(localStorage.getItem('bookmarksData'));
  return {
    type: actionTypes.ON_AUTH,
    data
  };
};


// helper function for retrieving token on LOGIN and REGISTER

const obtainToken = async (dispatch, authData) => {
  const response = await axiosInstance.post('/api/token/obtain/', authData);

  const data = {
    username: authData.username,
    accessToken: response.data.access,
  };

  dispatch(loadAuthenticate(data));
  localStorage.setItem('bookmarksData', JSON.stringify(data));
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
