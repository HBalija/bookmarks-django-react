import { createStore, combineReducers } from 'redux';

import bookmarksReducer from '../reducers/bookmarks';
import filtersReducer from '../reducers/filters';


export default () => {
  const store = createStore(
    combineReducers({
      bookmarks: bookmarksReducer,
      filters: filtersReducer
    })
  );
  return store;
};
