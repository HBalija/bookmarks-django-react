import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import BookmarkForm from './BookmarkForm';
import Spinner from './Spinner';
import NotFoundPage from './NotFoundPage';
import axiosInstance from '../axios';
import { startRemoveBookmark, startEditBookmark } from '../store/actions/bookmarks';


const EditBookmark = props => {


  const [bookmark, setBookmark] = useState(props.bookmark);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(!props.bookmark);


  useEffect(() => {
    if (loading) {
      axiosInstance.get(`/bookmarks/${props.match.params.id}/`)
        .then(response =>{
          setBookmark(response.data);
          setLoading(false);
        })
        .catch(error => {
          setNotFound(true);
          throw(error);
        });
    }
  });

  let jsx = (
    <>
      <BookmarkForm
        onSubmit={bk => {
          props.startEditBookmark(bookmark.id, bk, props.token);
          props.history.push('/');
        }}
        bookmark={bookmark}
        action='Edit bookmark' />
      <div className="delete-bookmark-container">
        <button
          className="button"
          onClick={() => {
            props.startRemoveBookmark(bookmark.id, props.token);
            props.history.push('/');
          }}>Remove
        </button>
      </div>
    </>
  );

  if (notFound) jsx = <NotFoundPage />;
  else if (loading) jsx = <Spinner />;

  return jsx;

};

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: state.bookmarks.find(
      bookmark => bookmark.id === parseInt(ownProps.match.params.id)),
    token: state.users.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startEditBookmark: (id, updates, token) => dispatch(startEditBookmark(id, updates, token)),
    startRemoveBookmark: (id, token) => dispatch(startRemoveBookmark(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookmark);
