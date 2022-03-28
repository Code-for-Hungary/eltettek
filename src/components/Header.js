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

const Header = (props) => {
  const withSearch = false;
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const headerHeight = withSearch ? styles.large : styles.small;

  return (
    <div className={`${styles.header} ${headerHeight}`}>
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
      {withSearch && <div className={`${styles.button} ${styles.searchbutton}`} onClick={() => setShowSearch(true)}>
        <Icon img={searchIcon} size="large"/>
        {showSearch && <Search/>}
      </div>}
    </div>
  );
}

export default Header;
