import React from 'react';
import Header from '../components/Header.js';

const Layout = (props) => {
  return (
    <div>
      <Header withSearch={props.withSearch} history={props.history}/>
      {props.children}
    </div>
  );
};


export default Layout;
