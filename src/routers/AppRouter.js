import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actionIndex';
import asyncComponent from '../components/hoc/asyncComponent';

import BookmarkList from '../components/containers/BookmarkList';
import Header from '../components/components/Header';
import Layout from '../components/UI/Layout';
import NotFoundPage from '../components/UI/NotFoundPage';


const Auth = asyncComponent(() => {
  return import('../components/containers/Auth');
});

const AddBookmark = asyncComponent(() => {
  return import('../components/containers/AddBookmark');
});

const EditBookmark = asyncComponent(() => {
  return import('../components/containers/EditBookmark');
});


const AppRouter = props => {
  const { onAuthCheckState, onStartSetBookmarks, isAuthenticated, token } = props;

  useEffect(() => {
    onAuthCheckState();
    onStartSetBookmarks(token);
  }, []); // eslint-disable-line

  let routes = (
    <Switch>
      <Route path='/' component={BookmarkList} exact={true} />
      <Route path='/auth' component={Auth} />
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
      <Header />
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.username !== null,
    token: state.auth.accessToken
  };

};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
    onStartSetBookmarks: token => dispatch(actions.startSetBookmarks(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
