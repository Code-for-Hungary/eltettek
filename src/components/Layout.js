import React from 'react';
import Header from '../components/Header.js';
import List from './List.js';
import Menu from './Menu';
import { MapContext } from '../context';

const Layout = (props) => {
  const { dispatch } = React.useContext(MapContext);

  React.useEffect(() => {
    dispatch({ type: 'ToggleMenu', showMenu: false });
  }, [dispatch]);

  return (
    <>
      <Header withSearch={props.withSearch} history={props.history}/>
      <Menu/>
      {props.children}
    </>
  );
};


export default Layout;
