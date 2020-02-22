import React from 'react';
import { connect } from 'react-redux';

import BookmarkListItem from './BookmarkListItem';
import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks, stopLoading } from '../actions/bookmarks';
import Spinner from './Spinner';


class BookmarkList extends React.Component {

  componentDidMount(){
    if (!this.props.bookmarks.length && this.props.loading) this.props.startSetBookmarks();
    this.props.stopLoading();
  }

  render() {
    return (
      <div>
        {
          this.props.loading ?
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
    loading: state.bookmarks.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSetBookmarks: () => dispatch(startSetBookmarks()),
    stopLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
