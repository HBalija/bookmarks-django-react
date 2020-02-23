import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../store/actions/users';
import { onLogoutSetBookmarks } from '../../store/actions/bookmarks';

const Header =  props => (
  <header>
    <h1>Bookmarks</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    { props.isAuthenticated &&
      <NavLink to="/create" activeClassName="is-active">Create Bookmark</NavLink> }
    { !props.isAuthenticated ?
      <NavLink to="/authenticate" activeClassName="is-active">Authenticate</NavLink> :
      <span onClick={() => {
        props.logout();
        props.onLogoutSetBookmarks();
      }}>{props.username} - Logout</span>
    }
  </header>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    username: state.users.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    onLogoutSetBookmarks: () => dispatch(onLogoutSetBookmarks())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
