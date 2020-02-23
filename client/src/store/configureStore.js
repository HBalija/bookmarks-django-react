import { createStore, combineReducers, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';

import bookmarksReducer from './reducers/bookmarks';
import filtersReducer from './reducers/filters';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({
      bookmarks: bookmarksReducer,
      filters: filtersReducer
    }),
    // applyMiddleware(thunk) this would work if we don't use redux devtool extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    applyMiddleware(thunk)
  );
  return store;
};
