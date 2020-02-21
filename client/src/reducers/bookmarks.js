const bookmarksReducer = (state = [], action) => {

  switch (action.type) {

  case 'ADD_BOOKMARK':
    return [ ...state, action.bookmark ];

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
