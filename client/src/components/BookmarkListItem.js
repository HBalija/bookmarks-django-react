import React from 'react';
import { Link } from 'react-router-dom';


const BookmarkListItem = ({ id, bookmarkLink, title }) => (
  <div>
    <Link to={`/edit/${id}`}><h3>{title}</h3></Link>
    <p><a href={bookmarkLink}>Visit page: {title}</a>  </p>
  </div>
);

export default BookmarkListItem;
