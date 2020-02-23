import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import  thunk from 'redux-thunk';

import bookmarksReducer from './reducers/bookmarks';
import filtersReducer from './reducers/filters';
import usersReducer from './reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({
      bookmarks: bookmarksReducer,
      filters: filtersReducer,
      users: usersReducer
    }),

    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
