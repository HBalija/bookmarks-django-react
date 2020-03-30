import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import bookmarkReducer from './reducers/bookmarkReducer';
import filterReducer from './reducers/filterReducer';
import authReducer from './reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({
      bookmarks: bookmarkReducer,
      filters: filterReducer,
      auth: authReducer
    }),

    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
