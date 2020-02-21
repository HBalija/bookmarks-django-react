// ADD_BOOKMARK

export const addBookmark = (
  { title = '', description = '', isPublic = false, bookmarkLink = '' } = {}) => ({
  type: 'ADD_BOOKMARK',
  bookmark: {
    title,
    description,
    isPublic,
    bookmarkLink
  }
});


// REMOVE_BOOKMARK

export const removeBookmark = id => ({
  type: 'REMOVE_BOOKMARK',
  id
});


// EDIT_BOOKMARK

export const editBookmark = (id, updates) => ({
  type: 'EDIT_BOOKMARK',
  id,
  updates
});
