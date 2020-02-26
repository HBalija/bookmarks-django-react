import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../store/actions/users';
import { onLogoutSetBookmarks } from '../store/actions/bookmarks';
import BookmarkListFilters from './BookmarkListFilters';

const Header =  props => {
  return (
    <header className="header">
      <div className="header-content-container">
        <div className="space-content">
          <div className="filters-container">
            <Link
              to="/">
              <h2 className="title">Bookmarks</h2>
            </Link>
            { props.location.pathname === '/' && <BookmarkListFilters />  }
          </div>
          {
            (!props.isAuthenticated && props.location.pathname !== '/auth') &&
              <Link
                to="/auth"><span className="button-header-login">Log in</span>
              </Link>
          }
          {
            props.isAuthenticated  &&
            <div className="header-right-group">
              <span className="user">Hello, {props.username}</span>
              {props.location.pathname === '/' &&
              <Link to="/create"><span className="button-header-login">New bookmark</span></Link> }
              <span
                className="button-header-login"
                onClick={() => {
                  props.logout();
                  props.onLogoutSetBookmarks();
                }}>Logout</span>
            </div>
          }
        </div>
      </div>
    </header>
  );
};

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
