
const filterReducerDefaultState = {
  text: '',
  show: 'all',
};

export default (state = filterReducerDefaultState, action) => {

  switch (action.type) {

  case 'SET_TEXT_FILTER':
    return { ...state, text: action.text };

  case 'SHOW_ALL_BOOKMARKS':
    return { ...state, show: 'all' };

  case 'SHOW_PUBLIC_BOOKMARKS':
    return { ...state, show: 'public' };

  case 'SHOW_USER_BOOKMARKS':
    return { ...state, show: 'user' };

  default:
    return state;
  }
};
