import React from 'react';

import { Link } from 'react-router-dom';


export default props => (
  <div className="bookmark-modal">
    <h2 className="modal-title"><a href={props.bookmark_link}>{props.name}</a></h2>
    <p>{props.description}</p>
    {
      props.user.username === props.currentUser &&
       <span>{ props.is_public ? 'Boommark is public.' : 'Bookmark is private.' }</span>

    }
    <div className="modal-button-container">
      <div>
        <a className="button" target="_blank" href={props.bookmark_link}>Visit bookmark</a>
        {
          props.user.username === props.currentUser &&
      <Link to={`/edit/${props.id}`}><span className="button">Edit</span></Link>
        }
      </div>
      <button
        className="button"
        onClick={props.clicked}>
        Close
      </button>
    </div>
  </div>
);
