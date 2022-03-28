import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Popup.module.css';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';
import { MapContext } from '../context';
import { displayName } from '../utils/helpers';


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
          {name && <h1>{name}</h1>}
          <div className={styles.popupRow}>
            <div className={styles.popupCol}>
              {company && (
                <div>
                  <span>Üzemeltető</span>
                  <div className={styles.company}>
                    <p><Link to={`/kekva/${company.name}`}>{company.name}</Link></p>
                  </div>
                </div>
              )}
              {!!link && (<div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Kapcsolódó cikk
                </a>
              </div>)}
              <div>
                <span>Cím</span>
                <div className={styles.popupRow}>
                  <p>{address}</p>
                </div>
              </div>
            </div>
            <div className={styles.popupCol}>
              {peps && peps.length > 0 && (
                  <>
                    <span>Személyek</span>
                    <div className={styles.pep}>
                      <p>{displayName(mainPep, 'kuratórium elnöke')}</p>
                      {restPeps && restPeps.length > 0 && restPeps.map((pep, key) => (
                        <div key={key}>
                          <p>{displayName(pep, 'kuratóriumi tag')}</p>
                        </div>
                      ))}
                    </div>
                  </>
              )}
            </div>
          </div>
          <Link to={`/ingatlan/${id}`} className={styles.moreButton}>Részletek</Link>
        </>
      </div>
    </div>
  );
};

export default Popup;
