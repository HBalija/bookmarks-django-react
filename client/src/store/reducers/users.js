const userReducerDefaultState = {
  username: '',
  isAuthenticated: false,
  refreshToken: '',
  accessToken: ''
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case 'ON_REFRESH_AUTHENTICATE':
    return { ...action.data };

  case 'ON_LOAD_AUTHENTICATE':
    return { ...action.data };

  case 'LOGOUT':
    return { ...userReducerDefaultState };

  default:
    return state;
  }
};
