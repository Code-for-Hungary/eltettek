import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import { config } from '../config';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menulist}>
        <li key="m1">
          <Link to="/terkep">Térkép</Link>
        </li>
        <li key="m2">
          <Link to="/projekt">Mi ez?</Link>
        </li>
        <li key="m3">
          <Link to="/kontakt">Kontakt</Link>
        </li>
        <li key="m4"><a href="https://tamogatas.k-monitor.hu" target="_blank" rel="noopener noreferrer">Tetszik? Támogasd!</a></li>
        {/* <li key="m5"><a href="https://tamogatas.k-monitor.hu" target="_blank" rel="noopener noreferrer"><font color="#F05F22">Támogasd!</font></a></li> */}
        <li key="m6"><Link to="/data-export">Adatok letöltése</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
