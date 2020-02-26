import React from 'react';
import { connect } from 'react-redux';

import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks } from '../store/actions/bookmarks';

import BookmarkListItem from './BookmarkListItem';
import Spinner from './Spinner';
import BookmarkModal from './BookmarkModal';
import ModalBackdrop from './ModalBackdrop';


class BookmarkList extends React.Component {

  state = {
    showModal: false,
    bookmarkShowed: ''
  }

  onShowModal = id => {
    const bookmarkShowed = this.props.bookmarks.find(bookmark => bookmark.id === id);
    this.setState(() => ({ showModal: true, bookmarkShowed }));
  }

  onHideModal = () => {
    this.setState(() => ({ showModal: false, bookmarkShowed: '' }));
  }

  componentDidMount() {
    // required check for editing and deleting bookmarks (setting state in store)
    if (this.props.listLoading) this.props.startSetBookmarks();
  }

  render() {
    return (
      <div>
        <h2 className="list-header">Share your WWW ideas ...</h2>
        <div
          className="center-container">
          {
            this.props.listLoading ?
              <Spinner /> :
              this.props.bookmarks.map(bookmark => (
                <BookmarkListItem
                  clicked={this.onShowModal}
                  key={bookmark.id}
                  { ...bookmark } />))
          }
          { this.state.showModal &&
        <BookmarkModal
          clicked={this.onHideModal}
          { ...this.state.bookmarkShowed }
          currentUser={this.props.user.username}
          show={this.state.showModal} />
          }
          <ModalBackdrop clicked={this.onHideModal} show={this.state.showModal} />
        </div>
      </div>
    );
  }
}

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
