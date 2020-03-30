import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actionIndex';
import BookmarkForm from './BookmarkForm';


const AddBookmark = props => {

  const addBookmarkHandler = bookmark => {
    props.onStartAddBookmark(props.token, bookmark);
    props.history.push('/');
  };

  return <BookmarkForm
    onSubmit={bookmark => addBookmarkHandler(bookmark)}
    action='Add bookmark' />;
};

const mapStateToProps = state => {
  return {
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartAddBookmark: (token, bookmark) => dispatch(actions.startAddBookmark(token, bookmark))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark);
