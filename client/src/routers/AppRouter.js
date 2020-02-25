import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import BookmarksDashboard from '../components/BookmarskDashboard/BookmarksDashboard';
import AddBookmark from '../components/AddBookmark/AddBookmark';
import EditBookmark from '../components/EditBookmark/EditBookmark';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import UserForm from '../components/UserForm/UserForm';

import { onRefreshAuthenticate } from '../store/actions/users';


class AppRouter extends React.Component {

  componentDidMount() {
    this.props.onRefreshAuthenticate();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/' component={BookmarksDashboard} exact={true} />
        <Route path='/auth' component={UserForm} />
        <Redirect to='/' />
        <Route component={NotFoundPage} />
      </Switch>

    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' component={BookmarksDashboard} exact={true} />
          <Route path='/create' component={AddBookmark} />
          <Route path='/edit/:id' component={EditBookmark} />
          <Redirect to='/' />
          <Route component={NotFoundPage} />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <Header />
          {routes}
        </div>
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
