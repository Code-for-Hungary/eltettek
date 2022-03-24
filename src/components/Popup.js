import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/popup.module.css';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';
import { MapContext } from '../context';


const Popup = (props) => {
  const { dispatch } = React.useContext(MapContext);
  const data = props.point.properties;
  const { id, peps, name, company, address, link } = data;

  const close = React.useCallback(() => {
    dispatch({ type: 'SetSelectedPoint', point: null });
    dispatch({ type: 'TogglePopup', showPopup: false });
  }, [dispatch]);

  const [mainPep, ...restPeps] = peps;

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.close} onClick={() => close()}>
          <Icon img={closeIcon} size="large"/>
        </div>
        <>
          <h1>{name}</h1>
          <div className={styles.popupInfo}>
            {company && (
              <div className={styles.popupRow}>
                <span>Üzemeltető</span>

                <Icon img={hotelIcon} size="small"/>
                <div className={styles.company}>
                  <p><Link to={`/company/${company.name}`}>{company.name}</Link></p>
                </div>
              </div>
            )}
            {peps && peps.length > 0 && (
              <div className={styles.popupRow}>
                <span>PEP</span>
                <Icon img={horseIcon} size="small"/>
                <div className={styles.pep}>
                  <p>{mainPep} <i>(kuratórium elnöke)</i></p>
                  {restPeps && restPeps.length > 0 && restPeps.map((pep, key) => (
                    <div key={key}>
                      <p>{pep} <i>(kuratóriumi tag)</i></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          <Link to={`/hotel/${id}`} className={styles.moreButton}>Részletek</Link>
        </>
      </div>
    </div>
  );
};

export default Popup;
