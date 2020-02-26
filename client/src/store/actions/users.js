import axiosInstance from '../../axios';


// AUTHENTICATE

export const onRefreshAuthenticate = () => {

  const data = JSON.parse(localStorage.getItem('bookmarksData'));

  return {
    type: 'AUTHENTICATE',
    data
  };
};

export const onLoadAuthenticate = data => {
  return {
    type: 'AUTHENTICATE',
    data
  };

};


const obtainToken = (dispatch, authData) => {
  axiosInstance.post('/api/token/obtain/', authData)
    .then(response => {

      const data = {
        username: authData.username,
        isAuthenticated: !!response.data.access,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      };

      dispatch(onLoadAuthenticate(data));
      localStorage.setItem('bookmarksData', JSON.stringify(data));
    });
};

// LOGIN

export const startAuthenticate = authData => {
  return dispatch => {
    obtainToken(dispatch, authData);
  };
};


// REGISTER

export const onRegister = authData => {
  return dispatch => {
    axiosInstance.post('/register/', authData)
      .then(response  => {
        return authData;
      }).then(data => {
        obtainToken(dispatch, data);
      });
  };
};


// LOGOUT

export const logout = () => {
  localStorage.removeItem('bookmarksData');
  return {
    type: 'LOGOUT'
  };
};
