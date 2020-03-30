import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actionIndex';

import AddBookmark from '../components/containers/AddBookmark';
import Auth from '../components/containers/Auth';
import BookmarkList from '../components/containers/BookmarkList';
import EditBookmark from '../components/containers/EditBookmark';
import Header from '../components/components/Header';
import Layout from '../components/UI/Layout';
import NotFoundPage from '../components/UI/NotFoundPage';


const AppRouter = props => {

  useEffect(() => {
    props.onRefreshAuthenticate();
    props.onStartSetBookmarks(props.token);
  }, [props]);

  let routes = (
    <Switch>
      <Route path='/' component={BookmarkList} exact={true} />
      <Route path='/auth' component={Auth} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  if (props.isAuthenticated) {
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
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.accessToken
  };

};

const mapDispatchToProps = dispatch => {
  return {
    onRefreshAuthenticate: () => dispatch(actions.refreshAuthenticate()),
    onStartSetBookmarks: token => dispatch(actions.startSetBookmarks(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
