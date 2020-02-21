import React from 'react';
import { connect } from 'react-redux';

import BookmarkForm from './BookmarkForm';
import { removeBookmark } from '../actions/bookmarks';
import { editBookmark } from '../actions/bookmarks';


const EditBookmarkPage = props => {
  return (
    <div>
      <BookmarkForm
        onSubmit={bookmark => {
          props.editBookmark(props.bookmark.id, bookmark);
          props.history.push('/');
        }}
        bookmark={props.bookmark}
        action='Edit bookmark' />
      <button
        onClick={() => {
          props.removebookmark(props.bookmark.id);
          props.history.push('/');
        }}>
      Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: state.bookmarks.find(bookmark => bookmark.id === ownProps.match.params.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editBookmark: (id, updates) => dispatch(editBookmark(id, updates)),
    removeBookmark: (id) => dispatch(removeBookmark(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookmarkPage);
