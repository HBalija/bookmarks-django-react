const defaultState = [];

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case 'SET_BOOKMARKS':
    return [ ...action.bookmarks ];

  case 'ADD_BOOKMARK':
    return [ action.bookmark, ...state ];

  case 'REMOVE_BOOKMARK':
    return  state.filter(bookmark => bookmark.id !== action.id);

  case 'EDIT_BOOKMARK':
    return state.map(bookmark => {
      if (action.id === bookmark.id) {
        return { ...bookmark, ...action.updates };
      }
      return bookmark;
    });

  case 'ON_LOGOUT_SET':
    return state.filter(bookmark => bookmark.is_public);

  default:
    return state;
  }
};

export default bookmarksReducer;
