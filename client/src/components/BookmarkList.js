import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks } from '../store/actions/bookmarks';

import BookmarkListItem from './BookmarkListItem';
import Spinner from './Spinner';
import BookmarkModal from './BookmarkModal';
import ModalBackdrop from './ModalBackdrop';


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

  useEffect(() => {
    if (props.listLoading) props.startSetBookmarks();
  });

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
        <BookmarkModal
          clicked={onHideModal}
          { ...bookmarkShowed }
          currentUser={props.user.username}
          show={showModal} />
        }
        <ModalBackdrop clicked={onHideModal} show={showModal} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    bookmarks: getBookmarks(state.bookmarks.bookmarks, state.filters, state.users.username),
    listLoading: state.bookmarks.listLoading,
    user: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSetBookmarks: () => dispatch(startSetBookmarks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
