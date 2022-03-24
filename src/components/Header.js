import React, { useContext } from 'react';

import Search from './Search';
import styles from '../css/header.module.css';
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';

import logo from '../assets/nh-logo.svg';
import hotel from '../assets/nh-hotel.svg';
import beach from '../assets/nh-beach.svg';
import restaurant from '../assets/nh-restaurant.svg';
import golf from '../assets/nh-golf.svg';
import { MapContext } from '../context';

const Header = (props) => {
  const { history, withSearch } = props;
  const { dispatch } = useContext(MapContext);

  const goHome = () => {
    dispatch({ type: 'TogglePopup', showPopup: false });
    history.push('/');
  };

  const onMenuCallback = () => {
    dispatch({ type: 'ToggleMenu', showMenu: true })
  };

  const headerHeight = withSearch ? styles.large : styles.small;

  return (
    <div className={`${styles.header} ${headerHeight}`}>
      <div className={styles.menubutton} onClick={onMenuCallback}>
        <Icon img={listIcon} size="large"/>
      </div>
      <div className={styles.headerWrapper}>
        <div onClick={() => goHome()} className={styles.logo}>
          <img src={logo} alt=""/>
        </div>
        <div className={styles.headerInner}>
          <div className={styles.icons}>
            <img src={hotel} alt=""/>
            <img src={beach} alt=""/>
            <img src={restaurant} alt=""/>
            <img src={golf} alt=""/>
          </div>
          {withSearch && <Search/>}
        </div>
      </div>
    </div>
  );
}

export default Header;
