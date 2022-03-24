import React from 'react';
import MapComponent from '../components/Map.js';
import Layout from './Layout';
import Filters from '../components/Filters.js';
import { MapContext } from '../context';
import styles from '../css/filters.module.css';

const MapView = (props) => {
  const { showFilters } = React.useContext(MapContext);

  return (
    <Layout withSearch withList history={props.history}>
      <div style={{display: 'flex'}}>
        <div className={`${styles.filtersContainer} ${showFilters ? styles.filtersVisible : ''}`}>
          {showFilters && <Filters/>}
        </div>
        <MapComponent/>
      </div>
    </Layout>
  );
};


export default MapView;
