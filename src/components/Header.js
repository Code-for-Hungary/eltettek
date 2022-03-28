import React, { useState } from 'react';

import Search from './Search';
import styles from './Header.module.css';
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';
import closeIcon from '../assets/close-icon.svg';
import Menu from './Menu';

const Header = (props) => {
  const { withSearch } = props;
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
        
      </div>
      {withSearch &&<div className={styles.searchbutton} onClick={() => setShowSearch(true)}>
        show
        {showSearch && <Search/>}
      </div>}
    </div>
  );
}

export default Header;
