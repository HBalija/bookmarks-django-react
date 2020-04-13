import React from 'react';

export default props => (
  props.show ? <div className="backdrop-container" onClick={props.clicked}></div> : null
);
