import * as actionTypes from '../actions/actionTypes';

const userReducerDefaultState = {
  username: null,
  accessToken: null
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case actionTypes.AUTH_SUCCESS:
    return { ...state, username: action.username, accessToken: action.token };

  case actionTypes.LOGOUT:
    return { ...userReducerDefaultState };

  default:
    return state;
  }
};
