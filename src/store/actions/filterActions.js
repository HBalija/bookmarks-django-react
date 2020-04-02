import * as actionTypes from './actionTypes';

// SET_TEXT_FILTER

export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});


// SHOW_USER_BOOKMARKS

export const showUser = () => ({ type: actionTypes.SHOW_USER_BOOKMARKS });


// SHOW_ALL_BOOKMARKS

export const showAll = () => ({ type: actionTypes.SHOW_ALL_BOOKMARKS });


// SHOW_PUBLIC_BOOKMARKS

export const showPublic = () => ({ type: actionTypes.SHOW_PUBLIC_BOOKMARKS });
