import * as actionTypes from '../actions/actionTypes';

const userReducerDefaultState = {
  username: null,
  refreshToken: null,
  accessToken: null
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case actionTypes.AUTHENTICATE:
    return { ...state, ...action.data };

  case actionTypes.LOGOUT:
    return { ...userReducerDefaultState };

  default:
    return state;
  }
};
