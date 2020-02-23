import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import BookmarksDashboard from '../components/BookmarskDashboard/BookmarksDashboard';
import AddBookmark from '../components/AddBookmark/AddBookmark';
import EditBookmark from '../components/EditBookmark/EditBookmark';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={BookmarksDashboard} exact={true} />
        <Route path='/create' component={AddBookmark} />
        <Route path='/edit/:id' component={EditBookmark} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);


export default AppRouter;
