const userReducerDefaultState = {
  username: '',
  isAuthenticated: false,
  refreshToken: '',
  accessToken: ''
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case 'AUTHENTICATE':
    return { ...action.data };

  case 'LOGOUT':
    return { ...userReducerDefaultState };

  default:
    return state;
  }
};


console.log();
/*
- ON REFRESH_AUTHENICATE
- ON_LOAD AUTHENTICATE

*/
