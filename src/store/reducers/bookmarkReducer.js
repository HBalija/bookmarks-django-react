import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  bookmarks: [],
  isLoading: false
};

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case actionTypes.START_LOADING:
    return {
      ...state,
      isLoading: true
    };

  case actionTypes.SET_BOOKMARKS:
    return {
      ...state,
      bookmarks: [ ...action.bookmarks ],
      isLoading: false
    };

  case actionTypes.ADD_BOOKMARK:
    return {
      ...state,
      bookmarks: [action.bookmark, ...state.bookmarks],
      isLoading: false
    };

  case actionTypes.REMOVE_BOOKMARK:
    return {
      ...state,
      bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.id)
    };

  case actionTypes.EDIT_BOOKMARK:
    return {
      ...state,
      bookmarks: state.bookmarks.map(bookmark => {
        if (action.id === bookmark.id) {
          return { ...bookmark, ...action.updates };
        }
        return bookmark;
      })
    };

  case actionTypes.ON_LOGOUT_SET_BOOKMARKS:
    return { ...state, bookmarks: state.bookmarks.filter(bookmark => bookmark.is_public) };

  default:
    return state;
  }
};

export default bookmarksReducer;
