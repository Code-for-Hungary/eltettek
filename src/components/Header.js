import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import styles from './Header.module.css';
import Icon from './Icon';
import logo from '../assets/logo.svg';
import listIcon from '../assets/menu-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import closeIcon from '../assets/close-icon.svg';
import Menu from './Menu';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
      {showSearch && <div className={styles.searchWrapper}><Search/></div>}
      {!showSearch ? (
        <div className={`${styles.button} ${styles.searchbutton}`} onClick={() => setShowSearch(true)}>
          <Icon img={searchIcon} size="large"/>
        </div>
      ) : (
        <div className={`${styles.button} ${styles.searchbutton}`} onClick={() => setShowSearch(false)}>
          <Icon img={closeIcon} size="large"/>
        </div>
      )
      }
    </div>
  );
}

export default Header;
