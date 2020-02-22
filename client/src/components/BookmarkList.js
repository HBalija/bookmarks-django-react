import React from 'react';
import { connect } from 'react-redux';

import BookmarkListItem from './BookmarkListItem';
import getBookmarks from '../utils/getVisibleBookmarks';
import { startSetBookmarks } from '../actions/bookmarks';


class BookmarkList extends React.Component {

  componentDidMount(){
    this.props.startSetBookmarks();
  }

  render() {

    return (
      <div>
        {
          this.props.loading ?
            <p>loading</p> :
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
    startSetBookmarks: () => dispatch(startSetBookmarks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
