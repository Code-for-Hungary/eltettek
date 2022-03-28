import React, { useContext, useState } from 'react';

import Search from './Search';
import styles from '../css/header.module.css';
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';
import { MapContext } from '../context';

const Header = (props) => {
  const { history, withSearch } = props;
  const { dispatch } = useContext(MapContext);
  const [showMap, setShowMap] = useState(false)

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
        
      </div>
      {withSearch &&<div className={styles.searchbutton} onClick={() => setShowMap(true)}>
        show
        {showMap && <Search/>}
      </div>}
    </div>
  );
}

export default Header;
