import React, {useContext, useState, useEffect, useCallback, createRef} from 'react';
import { MapContext, HotelContext } from '../context';
import Layout from '../components/Layout';
import List from '../components/List';
import Filters from '../components/Filters.js';
import Popup from '../components/Popup';
import Icon from '../components/Icon';
import MapComponent from '../components/MapComponent';
import filterStyles from '../components/Filters.module.css';
import styles from './Map.module.css';
import listIcon from '../assets/list-icon.svg';
import filterIcon from '../assets/filter-icon.svg';
import {getMarkerList} from '../leaflet-helper.js';

/**
 * @param {Hotel[]} points
 * @param {LatLngBounds} bounds
 * @returns {*}
 */
function showPoints(points, bounds) {
  return points.filter(point => {
    const [latitude, longitude] = point.geometry.coordinates;
    return (longitude > bounds._southWest.lng && longitude < bounds._northEast.lng
      && latitude > bounds._southWest.lat && latitude < bounds._northEast.lat);
  });
}

function MapPage(props) {
  const {
    dispatch,
    showPopup,
    center,
    selectedPoint,
    locationRequired,
    map,
    isFilterOn,
    showList,
    selectedFilters
  } = useContext(MapContext);
  const { hotels, categories } = useContext(HotelContext);
  const [loaded, setLoaded] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState([]);
  const mapRef = createRef();
  const [types, setTypes ] = useState({})
  const [pointsToShow, setPointsToShow] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const calcPoints = useCallback(() => {
    let mapBounds = mapRef.current.leafletElement.getBounds();
    const points = showPoints(pointsToShow, mapBounds);
    setVisiblePoints(points);
    dispatch({ type: 'SetList', list: points })
  }, [pointsToShow, dispatch, mapRef]);

  useEffect(() => {
    if (!loaded && hotels && categories) {    
      calcPoints();
      dispatch({ type: 'SetMap', map: mapRef.current.leafletElement });
      setLoaded(true);
      setTypes(categories)
      if (!selectedFilters.length) dispatch({ type: 'SetCategories', selectedFilters: Object.keys(categories) });
    }
  }, [hotels, categories, dispatch, loaded, calcPoints, mapRef, map, selectedFilters]);

  useEffect(() => {
    calcPoints();
  // eslint-disable-next-line
  }, [pointsToShow]);

  useEffect(() => {
    if (hotels) {
      const updatedPoints = hotels.filter((hotel) => {
        const code = hotel.properties.company.code;
        return !code || selectedFilters.includes(code)
      })
      setPointsToShow(updatedPoints)
    }
  }, [selectedFilters, hotels])

  useEffect(() => {
    if (!locationRequired) {
      dispatch({ type: 'SetLocator' });
    }
  }, [locationRequired, dispatch]);

  const onMarkerClickCallback = useCallback((point) => {
    dispatch({type: 'SetSelectedPoint', point});
    dispatch({type: 'TogglePopup', showPopup: true});
  }, [dispatch]);

  const openLocationListCallback = useCallback(() => {
    calcPoints();
    dispatch({ type: 'ToggleList', showList: true });
  }, [dispatch, calcPoints]);

  const markers = getMarkerList({
    points: visiblePoints,
    selectedPoint,
    clickCallback: onMarkerClickCallback,
    categories: types || {}
  });

  return (
    <Layout withSearch withList history={props.history}>
      <div style={{display: 'flex'}}>
        <div className={`${filterStyles.filtersContainer} ${showFilters ? filterStyles.filtersVisible : ''}`}>
          {showFilters && <Filters/>}
        </div>
        <div className={styles.map}>
          <div className={styles.mapWrapper}>
            <MapComponent
              mapRef={mapRef}
              markers={markers}
              center={center}
              onChange={calcPoints}
              locationRequired={locationRequired}
              withClusters
              withLocate
            />
            <div className={`${styles.extraButton} ${styles.listButton}`} onClick={openLocationListCallback}>
              <Icon img={listIcon} size="small"/>
            </div>
            <div className={`${styles.extraButton} ${styles.filterButton} ${isFilterOn ? styles.filterOn : ''}`}
              onClick={() => setShowFilters((prevState) => !prevState)}>
              <Icon img={filterIcon} size="small"/>
            </div>
          </div>
        </div>
        {showPopup && (<Popup point={selectedPoint}/>)}
      </div>
      {showList && <List/>}
    </Layout>
  );
}

export default MapPage;
