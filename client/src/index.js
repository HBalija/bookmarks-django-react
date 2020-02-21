import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { addBookmark } from './actions/bookmarks';

import './index.css';


const store = configureStore();

store.dispatch(addBookmark({ title: 'google', bookmarkLink: 'http://google.com' }));
store.dispatch(addBookmark({ title: 'github', bookmarkLink: 'http://github.com' }));
store.dispatch(addBookmark({ title: 'heroku', bookmarkLink: 'http://heroku.com', isPublic: true }));

console.log(store.getState());


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
