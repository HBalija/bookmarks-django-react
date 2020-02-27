import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import Header from '../components/Header';
import BookmarkList from '../components/BookmarkList';
import AddBookmark from '../components/AddBookmark';
import EditBookmark from '../components/EditBookmark';
import NotFoundPage from '../components/NotFoundPage';
import UserForm from '../components/UserForm';


import { onRefreshAuthenticate } from '../store/actions/users';


class AppRouter extends React.Component {

  componentDidMount() {
    this.props.onRefreshAuthenticate();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/' component={BookmarkList} exact={true} />
        <Route path='/auth' component={UserForm} />
        {/* <Redirect to='/' /> */}
        <Route component={NotFoundPage} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' component={BookmarkList} exact={true} />
          <Route path='/create' component={AddBookmark} />
          <Route path='/edit/:id' component={EditBookmark} />
          {/* <Redirect to='/' /> */}
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
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated
  };

};

const mapDispatchToProps = dispatch => {
  return {
    onRefreshAuthenticate: () => dispatch(onRefreshAuthenticate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
