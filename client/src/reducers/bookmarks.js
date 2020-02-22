const defaultState = {
  loading: true,
  bookmarks: []
};

const bookmarksReducer = (state = defaultState, action) => {

  switch (action.type) {

  case 'STOP_ČOADING':
    return { loading: false };

  case 'SET_BOOKMARKS':
    return { bookmarks: [...action.bookmarks ] };

  case 'ADD_BOOKMARK':
    return { bookmarks: [ ...state.bookmarks, action.bookmark ] };

  case 'REMOVE_BOOKMARK':
    return state.filter(bookmark => bookmark.id !== action.id);

  case 'EDIT_BOOKMARK':
    return state.map(bookmark => {
      if (action.id === bookmark.id) return { ...bookmark, ...action.updates };
      return bookmark;
    });

  default:
    return state;
  }
};

export default bookmarksReducer;
