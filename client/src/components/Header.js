import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../store/actions/users';
import { onLogoutSetBookmarks } from '../store/actions/bookmarks';

const Header =  props => {
  return (
    <header className="header">
      <div className="content-container">
        <div className="space-content">
          <NavLink
            to="/"
            activeClassName="is-active"
            exact={true}>
            <h2 className="title">Bookmarks</h2>
          </NavLink>
          { (!props.isAuthenticated && props.location.pathname !== '/auth') &&
            <NavLink
              to="/auth"
              activeClassName="is-active"><span className="button-header-login">Log in</span>
            </NavLink>
          }
          { props.isAuthenticated  &&
            <div>
              <span className="user">Hello, {props.username}</span>
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
