import React, { useEffect, Suspense, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../store/actions/actionIndex';

import BookmarkList from '../components/containers/BookmarkList';
import Layout from '../components/UI/Layout';
import NotFoundPage from '../components/UI/NotFoundPage';
import Spinner from '../components/UI/Spinner';


const Auth = React.lazy(() => {
  return import('../components/containers/Auth');
});

const AddBookmark = React.lazy(() => {
  return import('../components/containers/AddBookmark');
});

const EditBookmark = React.lazy(() => {
  return import('../components/containers/EditBookmark');
});


const AppRouter = () => {

  const isAuthenticated = useSelector(state => state.auth.username !== null);

  const dispatch = useDispatch();
  const onAuthCheckState = useCallback(() => dispatch(actions.authCheckState()), [dispatch]);

  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState]);

  let routes = (
    <Switch>
      <Route path='/' component={BookmarkList} exact={true} />
      <Route path='/auth' component={() => <Auth />} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/' component={BookmarkList} exact={true} />
        <Route path='/create' component={AddBookmark} />
        <Route path='/edit/:id' component={EditBookmark} />
        <Route path='/auth' component={Auth} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
