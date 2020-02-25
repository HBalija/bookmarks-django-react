import React from 'react';

import BookmarkList from './BookmarkList';
import BookmarkListFilters from './BookmarkListFilters';

const BookmarksDashboard = () => (
  <div>
    <BookmarkListFilters />
    <BookmarkList />
  </div>
);

export default BookmarksDashboard;
