import React from 'react';
import { connect } from 'react-redux';

import { addBookmark } from '../actions/bookmarks';
import BookmarkForm from './BookmarkForm';


const AddBookmark = props => (
  <div>
    <h1>Add Bookmark</h1>
    <BookmarkForm onSubmit={bookmark => {
      // create bookmark and redirect to dashboard
      props.addBookmark(bookmark);
      props.history.push('/');
    }}
    action='Add bookmark' />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    addBookmark: bookmark => dispatch(addBookmark(bookmark))
  };
};

export default connect(null, mapDispatchToProps)(AddBookmark);
