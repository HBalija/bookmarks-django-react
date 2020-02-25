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
    bookmark_link,
    user: {
      username: JSON.parse(localStorage.getItem('bookmarksData')).username
    }
  }
});

export const startAddBookmark = data => {
  return dispatch => {
    axiosInstance.post('/bookmarks/', data);
    dispatch(addBookmark(data));
  };
};


// REMOVE_BOOKMARK

export const removeBookmark = id => ({
  type: 'REMOVE_BOOKMARK',
  id
});

export const startRemoveBookmark = id => {
  return dispatch => {
    axiosInstance.delete(`/bookmarks/${id}/`);
    dispatch(removeBookmark(id));
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
/*
post("http://localhost:8080/foo", foo, {  headers: { Authorization: "Bearer " + token }})

*/

export const startSetBookmarks = () => {
  return dispatch => {
    // const tokenData = JSON.parse(localStorage.getItem('bookmarksData'));

    // const extra = {};
    // if (tokenData) {
    //   extra.headers = { Authorization:`JWT ${tokenData.accessToken}` };
    // }
    console.log();
    axiosInstance.get('/bookmarks/')
      .then(response => {
        dispatch(setBookmarks(response.data));
      })
      .catch(error =>{
        throw(error);
      });
  };};


// SET_LOADING

export const startListLoading = () => ({ type: 'START_LIST_LOADING' });


// ON_LOGOUT_SET

export const onLogoutSetBookmarks = () => ({ type: 'ON_LOGOUT_SET' });
