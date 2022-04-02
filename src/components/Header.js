import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import styles from './Header.module.css';
import Icon from './Icon';
import logo from '../assets/logo.svg';
import listIcon from '../assets/menu-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import closeIcon from '../assets/close-icon.svg';
import Menu from './Menu';
import { MapContext } from '../context';


const Header = ({ withSearch }) => {
  const { dispatch } = useContext(MapContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  const onSearchClose = useCallback(() => {
    setShowSearch(false);
    dispatch({ type: 'ToggleList', showList: false });
  }, [dispatch])

  return (
    <div className={styles.header}>
      {!showMenu ? (
        <div className={`${styles.button} ${styles.menubutton}`} onClick={() => setShowMenu(true)}>
          <Icon img={listIcon} size="large"/>
        </div>
        ) : (
        <div onClick={() => setShowMenu(false)} className={`${styles.button} ${styles.close}`}>
          <Icon img={closeIcon} size="large"/>
        </div>
      )}
      {showMenu && <Menu />}
      <div className={styles.headerWrapper}>
        <Link to="/"><img src={logo} alt="logo"/></Link>
      </div>
      {withSearch && <>
        {showSearch && <div className={styles.searchWrapper}><Search/></div>}
        {!showSearch ? (
          <div className={`${styles.button} ${styles.searchbutton}`} onClick={() => setShowSearch(true)}>
            <Icon img={searchIcon} size="large"/>
          </div>
        ) : (
          <div className={`${styles.button} ${styles.searchbutton}`} onClick={onSearchClose}>
            <Icon img={closeIcon} size="large"/>
          </div>
        )}
      </>}
    </div>
  );
}

export default Header;
