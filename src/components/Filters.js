import React, { useContext, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Filters.module.css';
import { colors } from '../utils/colors'

import { MapContext, HotelContext } from '../context';

function FilterInput({ label, id, onChange, color, checked }) {
  return (
    <li>
      <div className={styles.info}>
        <div className={styles.color} style={{ color }}></div>
        <Link to={`/kekva/${label}`}>{label}</Link>
      </div>
      <input type="checkbox" id={id} name={id} checked={checked} onChange={() => onChange(id)} />
      <div className={styles.checkbox}></div>
    </li>
  )
}

function Filters() {
  const { dispatch, selectedFilters } = useContext(MapContext);
  const { categories } = useContext(HotelContext);
  const defaultCategories = Object.keys(categories);
  

  const onChange = useCallback((filterCode) => {
    const updatedFilters = selectedFilters.includes(filterCode) ? 
      selectedFilters.filter(category => category !== filterCode) :
      [...selectedFilters, filterCode];

    dispatch({ type: 'SetCategories', selectedFilters: updatedFilters });
    dispatch({
      type: 'SetFilterOn',
      isFilterOn: updatedFilters.length !== defaultCategories.length
    });
  }, [selectedFilters, defaultCategories, dispatch]);

  const onAllClick = useCallback(() => {
    dispatch({ type: 'SetCategories', selectedFilters: defaultCategories });
    dispatch({ type: 'SetFilterOn', isFilterOn: false });
  }, [defaultCategories, dispatch]);

  const onClear = useCallback(() => {
    dispatch({ type: 'SetCategories', selectedFilters: [] });
    dispatch({ type: 'SetFilterOn', isFilterOn: true });
  }, [dispatch]);

  const isAll = useMemo(() =>
    selectedFilters.length === defaultCategories.length, 
  [selectedFilters, defaultCategories])

  return (
    <div className={styles.filtersWrapper}>
      <h2>Alapítványok</h2>
      <div className={styles.filtersList}>
        <div className={styles.buttonRow}>
          <button id='all' className={isAll && styles.active} onClick={onAllClick}>Mutasd mind</button>
          <button id='clear' className={!isAll && styles.active} onClick={onClear}>Kijelöltek törlése</button>
        </div>
        {Object.entries(categories).map(([code, label]) => (
          <FilterInput
            key={code}
            label={label}
            id={code}
            color={colors[code].code}
            checked={selectedFilters.includes(code)}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

export default Filters;
