import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setTextFilter, showUser, showAll, showPublic } from '../store/actions/filters';


const BookmarkListFilters = props => (
  <div className="filters-space-content">
    <div>
      <label className="fake-button">Search:
        <input
          className="text-input"
          type="text"
          value={props.filters.text}
          onChange={e => props.setTextFilter(e.target.value)} />
      </label>

      { props.isAuthenticated &&
    <select
      className="select"
      value={props.filters.show}
      onChange={e => {
        const data = e.target.value;
        if (data === 'all') props.showAll();
        else if (data === 'user') props.showUser();
        else if (data === 'public') props.showPublic();
      }} >
      <option value="all">All</option>
      <option value="user">My</option>
      <option value="public">Public</option>
    </select>
      }
    </div>
    {
      props.isAuthenticated &&
    <Link to="/create"><span className="button">New bookmark</span></Link>
    }
  </div>
);

const mapStateToProps = state => {
  return {
    filters: state.filters,
    isAuthenticated: state.users.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTextFilter: value => dispatch(setTextFilter(value)),
    showAll: () => dispatch(showAll()),
    showPublic: () => dispatch(showPublic()),
    showUser: () => dispatch(showUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkListFilters);
