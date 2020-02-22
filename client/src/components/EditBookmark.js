import React from 'react';
import { connect } from 'react-redux';

import BookmarkForm from './BookmarkForm';
import { startRemoveBookmark, startEditBookmark } from '../actions/bookmarks';


const startEditBookmarkPage = props => {
  return (
    <div>
      <BookmarkForm
        onSubmit={bk => {
          props.startEditBookmark(props.bookmark.id, bk);
          props.history.push('/');
        }}
        bookmark={props.bookmark}
        action='Edit bookmark' />

      <button
        onClick={() => {
          props.startRemoveBookmark(props.bookmark.id);
          props.history.push('/');
        }}>
      Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: state.bookmarks.bookmarks.find(
      bookmark => bookmark.id === parseInt(ownProps.match.params.id))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startEditBookmark: (id, updates) => dispatch(startEditBookmark(id, updates)),
    startRemoveBookmark: id => dispatch(startRemoveBookmark(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(startEditBookmarkPage);
