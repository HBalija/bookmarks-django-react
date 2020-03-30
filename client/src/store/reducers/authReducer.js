import * as actionTypes from '../actions/actionTypes';

const userReducerDefaultState = {
  username: null,
  accessToken: null
};

export default (state = userReducerDefaultState, action) => {

  switch (action.type) {
  case actionTypes.ON_AUTH:
    return { ...state, ...action.data };

  case actionTypes.LOGOUT:
    return { ...userReducerDefaultState };

  default:
    return state;
  }
};
