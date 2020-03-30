import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actionIndex';


const BookmarkListFilters = props => (
  <>
    <label className="fake-button">Search:
      <input
        className="text-input"
        type="text"
        value={props.filters.text}
        onChange={e => props.onSetTextFilter(e.target.value)} />
    </label>

    { props.isAuthenticated &&
    <select
      className="select"
      value={props.filters.show}
      onChange={e => {
        const data = e.target.value;
        if (data === 'all') props.onShowAll();
        else if (data === 'user') props.onShowUser();
        else if (data === 'public') props.onShowPublic();
      }} >
      <option value="all">All</option>
      <option value="user">My</option>
      <option value="public">Public</option>
    </select>
    }
  </>
);

const mapStateToProps = state => {
  return {
    filters: state.filters,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTextFilter: value => dispatch(actions.setTextFilter(value)),
    onShowAll: () => dispatch(actions.showAll()),
    onShowPublic: () => dispatch(actions.showPublic()),
    onShowUser: () => dispatch(actions.showUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkListFilters);
