import uuid from 'uuid';

import axios from '../axios';

// ADD_BOOKMARK

export const addBookmark = (
  { name = '', description = '', isPublic = false, bookmark_link = '' } = {}) => ({
  type: 'ADD_BOOKMARK',
  bookmark: {
    id: uuid(),
    name,
    description,
    isPublic,
    bookmark_link
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


// FETCH BOOKMARKS

export const stopLoading = () => ({
  type: 'STOP_LOADING',
});

export const setBookmarks = bookmarks => ({
  type: 'SET_BOOKMARKS',
  bookmarks
});

export const startSetBookmarks = () => {
  return dispatch => {
    axios.get('/bookmarks')
      .then(response => {
        dispatch(setBookmarks(response.data));
        dispatch(stopLoading());
      });
  };};
