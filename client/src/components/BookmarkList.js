import React from 'react';
import { connect } from 'react-redux';

import BookmarkListItem from './BookmarkListItem';
import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks, startListLoading } from '../store/actions/bookmarks';
import Spinner from './Spinner';


class BookmarkList extends React.Component {

  state = {
    tokenOnLogin: ''
  }

  componentDidMount() {
    // required check for editing and deleting bookmarks (setting state in store)
    if (this.props.listLoading) this.props.startSetBookmarks();
  }

  render() {
    return (
      <div className="center-container">
        {
          this.props.listLoading ?
            <Spinner /> :
            this.props.bookmarks.map(bookmark => (
              <BookmarkListItem key={bookmark.id} { ...bookmark } />))
        }
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
    startSetBookmarks: () => dispatch(startSetBookmarks()),
    startListLoading: () => dispatch(startListLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
