import React from 'react';
import { connect } from 'react-redux';


const BookmarkListItem = props => (
  <article className="bookmark">

    <h3>{props.name}</h3>
    <p
      className="space-content">
      <span>by: {props.user.username}</span>
    </p>
  </article>
);

const mapStateToProps = state => {
  return {
    currentUser: state.users.username
  };
};

export default connect(mapStateToProps)(BookmarkListItem);
