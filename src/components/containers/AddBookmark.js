import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actionIndex';

import BookmarkForm from '../components/BookmarkForm';
import Spinner from '../UI/Spinner';


const AddBookmark = props => {

  const [loading, setLoading] = useState(false);

  const addBookmarkHandler = bookmark => {
    setLoading(true);
    props.onStartAddBookmark(props.token, bookmark);
    setLoading(false);
    props.history.push('/');
  };

  let jsx = <BookmarkForm
    onSubmit={bookmark => addBookmarkHandler(bookmark)}
    action='Add bookmark' />;
  if (loading) jsx = <Spinner />;

  return jsx;
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
