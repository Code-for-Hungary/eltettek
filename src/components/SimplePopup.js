import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/popup.module.css';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';


const Popup = ({ point, close }) => {
  const data = point.properties;
  const { id, name, address, link } = data;

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.close} onClick={() => close()}>
          <Icon img={closeIcon} size="large"/>
        </div>
        <>
          <h1>{name}</h1>
          <div className={styles.popupInfo}>
            <div>
              <span>Cím</span>
              <div className={styles.popupRow}>
                <Icon img={pinIcon} size="small"/>
                <p>{address}</p>
              </div>
            </div>
            {!!link && (<div className={styles.popupRow}>
              <Icon img={linkIcon} size="small"/>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Kapcsolódó cikk
              </a>
            </div>)}
          </div>
          <Link to={`/ingatlan/${id}`} className={styles.moreButton}>Részletek</Link>
        </>
      </div>
    </div>
  );
};

export default Popup;
