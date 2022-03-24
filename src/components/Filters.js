import React, { useContext, useCallback, useState } from 'react';
import styles from '../css/filters.module.css';
import Icon from './Icon.js';
import {colors} from '../css/colors'
import closeIcon from '../assets/close-icon.svg';

import { MapContext, HotelContext } from '../context';

function FilterInput({ label, id, onChange, color }) {
  const [isChecked, setIsChecked] = useState(true);

  const onFilterChange = useCallback(() => {
    setIsChecked(!isChecked)
    onChange(id)
  }, [id, isChecked, onChange])

  return (
    <li>
      <div className={styles.info}>
        <div className={styles.color} style={{ color }}></div>
        <label>{label}</label>
      </div>
      <input type="checkbox" id={id} name={id} checked={isChecked} onChange={onFilterChange} />
      <div className={styles.checkbox}></div>
    </li>
  )
}

function Filters() {
  const { dispatch, selectedFilters } = useContext(MapContext);
  const { categories } = useContext(HotelContext);
  const defaultCategories = Object.keys(categories);
  const colorList = Object.values(colors);
  const close = () => {
    dispatch({ type: 'ToggleFilters', showFilters: false });
  }

  const onChange = useCallback((filterCode) => {
    const updatedFilters = selectedFilters.includes(filterCode) ? 
     selectedFilters.filter(category => category !== filterCode) :
     [...selectedFilters, filterCode];

    dispatch({ type: 'SetCategories', selectedFilters: updatedFilters });
    dispatch({
      type: 'SetFilterOn',
      isFilterOn: updatedFilters.length !== defaultCategories.length
    });
  }, [selectedFilters, defaultCategories, dispatch])

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.closeButton} onClick={close}>
        <Icon img={closeIcon} size="large"/>
      </div>
      <h1>Alapítványok</h1>
      <ul className={styles.filtersList}>
        {/* <FilterInput key="all" label={label} id={code} onChange={onChange} color="#000" /> */}
        {/* <FilterInput key="clear" label={label} id={code} onChange={onChange} color="transparent" /> */}
        {Object.entries(categories).map(([code, label], index) => (
          <FilterInput key={code} label={label} id={code} onChange={onChange} color={colorList[index]} />
        ))}
      </ul>
    </div>
  )
}

export default Filters;
