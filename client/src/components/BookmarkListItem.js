import React from 'react';


const BookmarkListItem = props => (
  <article onClick={() => props.clicked(props.id)} className="bookmark">
    <h3>{props.name}</h3>
    <p className="space-content">
      <span>by: {props.user.username}</span>
    </p>
  </article>
);

export default BookmarkListItem;
