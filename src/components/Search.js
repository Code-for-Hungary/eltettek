import React from 'react';
import styles from '../css/search.module.css';

import { MapContext, HotelContext } from '../context';

/**
 * @param {{name: string, address: string, mainpep: string[]}} place
 * @param {string} phrase
 * @returns {*|boolean}
 */
function findProperty(place, phrase) {
    const foundpeps = place.peps.length > 0 ?
      place.peps.filter(pep => isMatching(pep.name, phrase)) :
      [];
    const foundPlace = place.name && isMatching(place.name, phrase);
    const foundCity = place.city && isMatching(place.city, phrase);
    const foundCompany = place.company && place.company.name && isMatching(place.company.name, phrase);

    return (foundPlace || foundCity || foundCompany || foundpeps.length > 0);
  }

/**
 * Source: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript#answer-37511463
 *
 * @param {string} string
 * @returns {string}
 */
function removeAccents(string) {
  return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isMatching(key, string) {
  return (key.toLowerCase().includes(string) || removeAccents(key).includes(string));
}

function Search() {
  const {dispatch} = React.useContext(MapContext);
  const {hotels} = React.useContext(HotelContext);
  const [value, setValue] = React.useState('');

  const onSearchCallback = React.useCallback((event) => {
    event.preventDefault();
    dispatch({ type: 'TogglePopup', showPopup: false });

    const results = hotels.filter(hotel => (findProperty(hotel.properties, value.toLowerCase())));
    dispatch({ type: 'SetList', list: results });
    dispatch({ type: 'ToggleList', showList: true });
  }, [dispatch, hotels, value]);

  const onKeyUpCallback = React.useCallback((event) => {
    setValue(event.target.value);
    if (event.key === 'Escape' || value === '') {
      dispatch({ type: 'SetList', list: [] });
      dispatch({ type: 'ToggleList', showList: false });
    }
  }, [value, dispatch]);

  return (
    <div className={styles.form}>
      <form onSubmit={onSearchCallback}>
        <input onKeyUp={onKeyUpCallback} className={styles.input} placeholder="keress név, hely, személy szerint"/>
      </form>
    </div>
  );
}

export default Search;
