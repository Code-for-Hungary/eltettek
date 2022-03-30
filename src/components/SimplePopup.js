import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Popup.module.css';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';

const SimplePopup = ({ point, close }) => {
  const data = point.properties;
  const { id, name, address } = data;

  return (
    <div className={`${styles.popup} ${styles.simple}`}>
      <div className={styles.popupInner}>
        <div className={styles.close} onClick={() => close()}>
          <Icon img={closeIcon} size="large"/>
        </div>
        <>
          {name && <h1>{name}</h1>}
          <div className={styles.popupInfo}>
            <div>
              <span>Cím</span>
              <div className={styles.popupRow}>
                <p>{address}</p>
              </div>
            </div>
          </div>
          <Link to={`/ingatlan/${id}`} className={styles.moreButton}>Részletek</Link>
        </>
      </div>
    </div>
  );
};

export default SimplePopup;
