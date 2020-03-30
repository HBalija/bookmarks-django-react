import * as actionTypes from '../actions/actionTypes';


const filterReducerDefaultState = {
  text: '',
  show: 'all',
};

export default (state = filterReducerDefaultState, action) => {

  switch (action.type) {

  case actionTypes.SET_TEXT_FILTER:
    return { ...state, text: action.text };

  case actionTypes.SHOW_ALL_BOOKMARKS:
    return { ...state, show: 'all' };

  case actionTypes.SHOW_PUBLIC_BOOKMARKS:
    return { ...state, show: 'public' };

  case actionTypes.SHOW_USER_BOOKMARKS:
    return { ...state, show: 'user' };

  default:
    return state;
  }
};
