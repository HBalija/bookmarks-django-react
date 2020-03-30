import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/actionIndex';

import Filters from './Filters';


const Header = props => {
  return (
    <header className="header">
      <div className="header-content-container">
        <div className="space-content">
          <div className="filters-container">
            <Link
              to="/">
              <h1 className="title">Bookmarks</h1>
            </Link>
            { props.location.pathname === '/' && <Filters /> }
          </div>
          {
            (!props.isAuthenticated && props.location.pathname !== '/auth') &&
              <Link
                to="/auth"><span className="button-header-login">Log in</span>
              </Link>
          }
          {
            props.isAuthenticated &&
            <div className="header-right-group">
              <span className="user">Hello, {props.username}</span>
              {props.location.pathname === '/' &&
              <Link to="/create"><span className="button-header-login">New bookmark</span></Link> }
              <span
                className="button-header-login"
                onClick={() => {
                  props.onLogout();
                  props.onLogoutSetBookmarks();
                  props.history.push('/');
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
    isAuthenticated: state.auth.username !== null,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onLogoutSetBookmarks: () => dispatch(actions.onLogoutSetBookmarks())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
