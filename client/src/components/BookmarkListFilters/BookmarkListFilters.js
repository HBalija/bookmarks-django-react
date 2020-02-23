import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter } from '../../store/actions/filters';


const BookmarkListFilters = props => (
  <div>
    <label>
      Search:
      <input
        type="text"
        value={props.filters.text}
        onChange={e => props.setTextFilter(e.target.value)} />
    </label>
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
