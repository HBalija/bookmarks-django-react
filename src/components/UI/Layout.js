import React from 'react';
import Header from '../components/Header';

export default props => (
  <>
    <Header />
    <div className="layout-container">
      {props.children}
    </div>
  </>
);
