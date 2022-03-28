import React from 'react';
import Header from '../components/Header.js';

const Layout = (props) => {
  return (
    <>
      <Header withSearch={props.withSearch} history={props.history}/>
      {/* <Menu/> */}
      {props.children}
    </>
  );
};


export default Layout;
