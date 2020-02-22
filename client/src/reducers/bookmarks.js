const defaultState = {
  listLoading: true,
  bookmarks: [],
};

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case 'SET_BOOKMARKS':
    return { ...state, bookmarks: [...action.bookmarks ], listLoading: false };

  case 'ADD_BOOKMARK':
    return { ...state, bookmarks: [ ...state.bookmarks, action.bookmark ] };

  case 'REMOVE_BOOKMARK':
    return { bookmarks: state.bookmarks.filter(bookmark => {
      return bookmark.id !== action.id;
    }) };

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

  default:
    return state;
  }
};

export default bookmarksReducer;
