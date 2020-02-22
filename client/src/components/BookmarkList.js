import React from 'react';
import { connect } from 'react-redux';

import BookmarkListItem from './BookmarkListItem';
import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks } from '../actions/bookmarks';
import Spinner from './Spinner';


class BookmarkList extends React.Component {

  componentDidMount(){
    if (this.props.listLoading) this.props.startSetBookmarks();
  }

  render() {
    return (
      <div>
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
    bookmarks: getBookmarks(state.bookmarks.bookmarks, state.filters),
    listLoading: state.bookmarks.listLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSetBookmarks: () => dispatch(startSetBookmarks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
