import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actionIndex';
import asyncComponent from '../components/hoc/asyncComponent';

import BookmarkList from '../components/containers/BookmarkList';
import Header from '../components/components/Header';
import Layout from '../components/UI/Layout';
import NotFoundPage from '../components/UI/NotFoundPage';


const asyncAuth = asyncComponent(() => {
  return import('../components/containers/Auth');
});

const asyncAddBookmark = asyncComponent(() => {
  return import('../components/containers/AddBookmark');
});

const asyncEditBookmark = asyncComponent(() => {
  return import('../components/containers/EditBookmark');
});


const AppRouter = props => {

  useEffect(() => {
    props.onAuthCheckState();
    props.onStartSetBookmarks(props.token);
  }, [props]);

  let routes = (
    <Switch>
      <Route path='/' component={BookmarkList} exact={true} />
      <Route path='/auth' component={asyncAuth} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/' component={BookmarkList} exact={true} />
        <Route path='/create' component={asyncAddBookmark} />
        <Route path='/edit/:id' component={asyncEditBookmark} />
        <Route path='/auth' component={asyncAuth} />
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
