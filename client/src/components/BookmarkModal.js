import React, { Component }  from 'react';


export default class Bookmark extends Component {


  render() {
    return (
      <p>Modal</p>
    );
  }
}


/*

<h3><a href={props.bookmark_link}>{props.name}</a></h3>


{
  props.user.username === props.currentUser &&
  <Link to={`/edit/${props.id}`}><span className="edit">EDIT</span></Link>
}

*/
