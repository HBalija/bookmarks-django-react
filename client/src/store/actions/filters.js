// SET_TEXT_FILTER

export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});


// SHOW_USER_BOOKMARKS

export const showUser = () => ({ type: 'SHOW_USER_BOOKMARKS' });


// SHOW_ALL_BOOKMARKS

export const showAll = () => ({ type: 'SHOW_ALL_BOOKMARKS' });


// SHOW_PUBLIC_BOOKMARKS

export const showPublic = () => ({ type: 'SHOW_PUBLIC_BOOKMARKS' });
