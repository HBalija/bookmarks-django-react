import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../axios';
import * as actions from '../../store/actions/actionIndex';

import BookmarkForm from '../components/BookmarkForm';
import Spinner from '../UI/Spinner';
import NotFoundPage from '../UI/NotFoundPage';


const EditBookmark = props => {

  const [bookmark, setBookmark] = useState(props.bookmark);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(!props.bookmark);

  useEffect(() => {
    console.log('move to actions');
    if (loading) {
      axiosInstance.get(`/bookmarks/${props.match.params.id}/`,
        { headers: { Authorization: `JWT ${props.token}` } })
        .then(response =>{
          setBookmark(response.data);
          setLoading(false);
        })
        .catch(error => {
          setNotFound(true);
          throw(error);
        });
    }
  }, []);  // eslint-disable-line

  let jsx = (
    <>
      <BookmarkForm
        onSubmit={bk => {
          props.onStartEditBookmark(bookmark.id, bk, props.token);
          props.history.push('/');
        }}
        bookmark={bookmark}
        action='Edit bookmark' />
      <div className="delete-bookmark-container">
        <button
          className="button"
          onClick={() => {
            props.onStartRemoveBookmark(bookmark.id, props.token);
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
    bookmark: state.bookmarks.bookmarks.find(
      bookmark => bookmark.id === parseInt(ownProps.match.params.id)),
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartEditBookmark: (id, updates, token) => dispatch(
      actions.startEditBookmark(id, updates, token)),
    onStartRemoveBookmark: (id, token) => dispatch(actions.startRemoveBookmark(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookmark);
