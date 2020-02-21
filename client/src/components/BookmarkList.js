import React from 'react';
import { connect } from 'react-redux';

import BookmarkListItem from './BookmarkListItem';
import getBookmarks from '../utils/getVisibleBookmarks';

const BookmarkList = props => (
  <div>
    {props.bookmarks.map(bookmark => (<BookmarkListItem key={bookmark.id} { ...bookmark } />))}
  </div>
);

const mapStateToProps = state => {
  return {
    bookmarks: getBookmarks(state.bookmarks, state.filters)
  };
};

export default connect(mapStateToProps)(BookmarkList);
