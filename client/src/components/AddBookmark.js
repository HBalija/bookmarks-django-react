import React from 'react';
import { connect } from 'react-redux';

import { startAddBookmark } from '../store/actions/bookmarks';
import BookmarkForm from './BookmarkForm';


const AddBookmark = props => (
  <BookmarkForm onSubmit={bookmark => {
    props.startAddBookmark(bookmark);
    props.history.push('/');
  }}
  action='Add bookmark' />
);

const mapDispatchToProps = dispatch => {
  return {
    startAddBookmark: bookmark => dispatch(startAddBookmark(bookmark))
  };
};

export default connect(null, mapDispatchToProps)(AddBookmark);
