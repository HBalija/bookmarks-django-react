import uuid from 'uuid';

import axiosInstance from '../../axios';
import * as actionTypes from './actionTypes';


// ADD_BOOKMARK

const addBookmark = (
  { name = '', description = '', is_public = false, bookmark_link = '' } = {}) => ({
  type: actionTypes.ADD_BOOKMARK,
  bookmark: {
    id: uuid(),
    name,
    description,
    is_public,
    bookmark_link,
    user: {
      username: JSON.parse(localStorage.getItem('bookmarksData')).username
    }
  }
});

export const startAddBookmark = (token, data) => {
  return dispatch => {
    axiosInstance.post(
      '/bookmarks/', data, { headers: { Authorization: token ? `JWT ${token}` : '' } });
    dispatch(addBookmark(data));
  };
};


// REMOVE_BOOKMARK

const removeBookmark = id => ({
  type: actionTypes.REMOVE_BOOKMARK,
  id
});

export const startRemoveBookmark = (id, token) => {
  return dispatch => {
    axiosInstance.delete(`/bookmarks/${id}/`,
      { headers: { Authorization: token ? `JWT ${token}` : '' } });
    dispatch(removeBookmark(id));
  };
};


// EDIT_BOOKMARK

const editBookmark = (id, updates) => ({
  type: actionTypes.EDIT_BOOKMARK,
  id,
  updates
});

export const startEditBookmark = (id, updates, token) => {
  return dispatch => {
    dispatch(editBookmark(id, updates));
    axiosInstance.patch(`/bookmarks/${id}/`, updates,
      { headers: { Authorization: token ? `JWT ${token}` : '' } });
  };
};


// FETCH BOOKMARKS

const setBookmarks = bookmarks => ({
  type: actionTypes.SET_BOOKMARKS,
  bookmarks
});

export const startSetBookmarks = token => {
  return dispatch => {
    axiosInstance.get('/bookmarks/', { headers: { Authorization: token ? `JWT ${token}` : '' } })
      .then(response => {
        dispatch(setBookmarks(response.data));
      })
      .catch(error =>{
        throw(error);
      });
  };};


// ON_LOGOUT_SET

export const onLogoutSetBookmarks = () => ({ type: actionTypes.ON_LOGOUT_SET_BOOKMARKS });
