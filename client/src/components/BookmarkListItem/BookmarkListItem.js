import React from 'react';
import { Link } from 'react-router-dom';


const BookmarkListItem = ({ id, bookmark_link, name }) => (
  <div>
    <Link to={`/edit/${id}`}><h3>{name}</h3></Link>
    <p><a href={bookmark_link}>Visit page: {name}</a>  </p>
  </div>
);

export default BookmarkListItem;
