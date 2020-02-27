const defaultState = {
  listLoading: true,
  bookmarks: [],
};

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case 'START_LIST_LOADING':
    return { ...state, listLoading: true };

  case 'SET_BOOKMARKS':
    return { ...state, bookmarks: [...action.bookmarks ], listLoading: false };

  case 'ADD_BOOKMARK':
    return { ...state, bookmarks: [ action.bookmark, ...state.bookmarks ] };

  case 'REMOVE_BOOKMARK':
    return { ...state, bookmarks: state.bookmarks.filter(
      bookmark => bookmark.id !== action.id)
    };

  case 'EDIT_BOOKMARK':
    return {
      ...state,
      bookmarks: state.bookmarks.map(bookmark => {
        if (action.id === bookmark.id) {
          return { ...bookmark, ...action.updates };
        }
        return bookmark;
      })
    };

  case 'ON_LOGOUT_SET':
    return {
      ...state,
      bookmarks: state.bookmarks.filter(bookmark => bookmark.is_public)
    };

  default:
    return state;
  }
};

export default bookmarksReducer;
