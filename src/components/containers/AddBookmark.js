import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/actionIndex';

import BookmarkForm from '../components/BookmarkForm';
import Spinner from '../UI/Spinner';


const AddBookmark = props => {

  const isLoading = useSelector(state => state.bookmarks.isLoading);
  const token = useSelector(state => state.auth.accessToken);

  const dispatch = useDispatch();
  const onStartAddBmk = (token, bookmark) => dispatch(actions.startAddBookmark(token, bookmark));

  const addBookmarkHandler = bookmark => {
    onStartAddBmk(token, bookmark);
    props.history.push('/');
  };

  let jsx = <BookmarkForm
    onSubmit={bookmark => addBookmarkHandler(bookmark)}
    action='Add bookmark' />;
  if (isLoading) jsx = <Spinner />;

  return jsx;
};

export default AddBookmark;
