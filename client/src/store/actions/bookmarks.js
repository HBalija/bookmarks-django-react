import uuid from 'uuid';

import axiosInstance from '../../axios';

// ADD_BOOKMARK

export const addBookmark = (
  { name = '', description = '', is_public = false, bookmark_link = '' } = {}) => ({
  type: 'ADD_BOOKMARK',
  bookmark: {
    id: uuid(),
    name,
    description,
    is_public,
    bookmark_link
  }
});


// REMOVE_BOOKMARK

export const removeBookmark = id => ({
  type: 'REMOVE_BOOKMARK',
  id
});

export const startRemoveBookmark = id => {
  return dispatch => {
    dispatch(removeBookmark(id));
    axiosInstance.delete(`/bookmarks/${id}/`);
  };
};

// EDIT_BOOKMARK

export const editBookmark = (id, updates) => ({
  type: 'EDIT_BOOKMARK',
  id,
  updates
});

export const startEditBookmark = (id, updates) => {
  return dispatch => {
    dispatch(editBookmark(id, updates));
    axiosInstance.patch(`/bookmarks/${id}/`, updates);
  };
};


// FETCH BOOKMARKS

export const setBookmarks = bookmarks => ({
  type: 'SET_BOOKMARKS',
  bookmarks
});

export const startSetBookmarks = () => {
  return dispatch => {
    axiosInstance.get('/bookmarks')
      .then(response => {
        dispatch(setBookmarks(response.data));
      })
      .catch(error =>{
        throw(error);
      });
  };};
