import React from 'react';

import BookmarkList from '../BookmarkList/BookmarkList';
import BookmarkListFilters from '../BookmarkListFilters/BookmarkListFilters';

const BookmarksDashboard = () => (
  <div>
    <BookmarkListFilters />
    <BookmarkList />
  </div>
);

export default BookmarksDashboard;
