import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const BookmarkListItem = props => (
  <div>
    <h3>{props.name}</h3>
    <p>{props.description}</p>
    <p>posted by: {props.user.username}</p>
    { props.user.username === props.currentUser && <Link to={`/edit/${props.id}`}>EDIT</Link> }
    <p><a href={props.bookmark_link}>Visit bookmark</a>  </p>
  </div>
);

const mapStateToProps = state => {
  return {
    currentUser: state.users.username
  };
};

export default connect(mapStateToProps)(BookmarkListItem);
