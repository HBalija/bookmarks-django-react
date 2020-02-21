import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter } from '../actions/filters';


const BookmarkListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => props.setTextFilter(e.target.value)} />
  </div>
);

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTextFilter: value => dispatch(setTextFilter(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkListFilters);
