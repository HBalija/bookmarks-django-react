import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  bookmarks: [],
  listLoading: true
};

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case actionTypes.SET_BOOKMARKS:
    return {
      ...state,
      bookmarks: [ ...action.bookmarks ],
      listLoading: false
    };

  case actionTypes.ADD_BOOKMARK:
    return {
      ...state,
      bookmarks: [action.bookmark, ...state.bookmarks] }
    ;

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
