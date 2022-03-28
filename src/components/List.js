import React, { useContext, useCallback } from 'react';
import styles from './List.module.css';
import Icon from './Icon.js';

import closeIcon from '../assets/close-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

import { MapContext } from '../context';


const ListItem = ({ item }) => {
  const { properties: { peps, name, address} } = item || {};

  return (<>
    <h1>{name}</h1>
    <div className={styles.listItemRow}>
    <div className={styles.listItemCol}>
        <Icon img={pinIcon} size="small"/>
        <p>{address}</p>
      </div>
      {peps.length > 0 && (
        <div className={styles.listItemCol}>
          <div className={styles.pepList}>
            {peps.map((pep, key) => (
                <p key={key}>{pep.name}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  </>)
};

function List() {
  const { dispatch, list, map } = useContext(MapContext);

  const showItem = useCallback((item) => () => {
    const [lat, lng] = item.geometry.coordinates;
    if (map) {
      map.setView([lat, lng], 18);
    }
    dispatch({ type: 'SetCenter', center: [lat, lng] });
    dispatch({ type: 'SetSelectedPoint', point: item });
    dispatch({ type: 'ToggleList', showList: false });
    dispatch({ type: 'TogglePopup', showPopup: true });
  }, [map, dispatch]);

  const closeList = () => {
      dispatch({ type: 'ToggleList', showList: false });
  }

  return (
    <div className={styles.list}>
      <div className={styles.closeButton} onClick={closeList}>
        <Icon img={closeIcon} size="large"/>
      </div>
      <div className={styles.listWrapper}>
        {list && list.length > 0 && list.map((item, key) => (
          <div key={key} className={styles.listItem} onClick={showItem(item)}>
            <ListItem item={item}/>
          </div>
        ))}

        {list.length === 0 && (
          <p>Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet, <a href="https://docs.google.com/forms/d/e/1FAIpQLSdi6uNP-ML46outzCbOifdwKefAaB1x_j9eXMzeTJYGB5NEnA/viewform">küldd el nekünk
          </a>!</p>
        )}
      </div>
    </div>
  );
}

export default List;
