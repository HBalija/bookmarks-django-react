import React, { useState } from 'react';
import { connect } from 'react-redux';

import getBookmarks from '../../utils/getVisibleBookmarks';

import BookmarkListItem from '../components/BookmarkListItem';
import Modal from '../UI/Modal';
import ModalBackdrop from '../UI/ModalBackdrop';
import Spinner from '../UI/Spinner';


const BookmarkList = props => {

  const [showModal, onShowModal] = useState(false);
  const [bookmarkShowed, onShowBookmark] = useState('');

  const startShowModal = id => {
    onShowBookmark(props.bookmarks.find(bookmark => bookmark.id === id));
    onShowModal(true);
  };

  const onHideModal = () => {
    onShowModal(false);
    onShowBookmark('');
  };

  return (
    <div className="list-container">
      <h2 className="list-header">Share your WWW ideas ...</h2>
      <div
        className="center-container">
        {
          props.listLoading ?
            <Spinner /> :
            props.bookmarks.map(bookmark => (
              <BookmarkListItem
                clicked={startShowModal}
                key={bookmark.id}
                { ...bookmark } />))
        }
        { showModal &&
        <Modal
          clicked={onHideModal}
          { ...bookmarkShowed }
          currentUser={props.username}
          show={showModal} />
        }
        <ModalBackdrop clicked={onHideModal} show={showModal} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    bookmarks: getBookmarks(state.bookmarks.bookmarks, state.filters, state.auth.username),
    listLoading: state.bookmarks.listLoading,
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(BookmarkList);
