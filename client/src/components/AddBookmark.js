import React from 'react';
import { connect } from 'react-redux';

import { startAddBookmark } from '../store/actions/bookmarks';
import BookmarkForm from './BookmarkForm';


const AddBookmark = props => (
  <BookmarkForm onSubmit={bookmark => {
    props.startAddBookmark(props.token, bookmark);
    props.history.push('/');
  }}
  action='Add bookmark' />
);

const mapStateToProps = state => {
  return {
    token: state.users.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startAddBookmark: (token, bookmark) => dispatch(startAddBookmark(token, bookmark))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark);
