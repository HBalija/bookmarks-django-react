
const filterReducerDefaultState = {
  text: '',
  sortBy: 'public',
};

export default (state = filterReducerDefaultState, action) => {

  switch (action.type) {

  case 'SET_TEXT_FILTER':
    return { ...state, text: action.text };

  case 'SORT_BY_PUBLIC':
    return { ...state, sortBy: 'public' };

  case 'SORT_BY_USER':
    return { ...state, sortBy: 'user' };

  default:
    return state;
  }
};
