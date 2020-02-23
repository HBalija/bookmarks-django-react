const userReducerDefaultState = {
  isAuthenticated: null,
  username: null
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case 'GET_USER_DATA':
    return { ...state, isAuthenticated: !!action.userToken, username: action.username };

  default:
    return state;
  }
};
