import React, {useContext, useState, useEffect, useCallback, createRef} from 'react';

import {Map, TileLayer} from 'react-leaflet';
import LocateControl from './LocateControl.js';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Popup from '../components/Popup';
import Icon from './Icon';

import listIcon from '../assets/menu-icon.svg';
import filterIcon from '../assets/filter-icon.svg';

import styles from '../css/map.module.css';
import { MapContext, HotelContext } from '../context';
import {createClusterCustomIcon, getMarkerList} from '../leaflet-helper.js';

/**
 * @param {Hotel[]} points
 * @param {LatLngBounds} bounds
 * @returns {*}
 */
export function showPoints(points, bounds) {
  return points.filter(point => {
    const [latitude, longitude] = point.geometry.coordinates;
    return (longitude > bounds._southWest.lng && longitude < bounds._northEast.lng
      && latitude > bounds._southWest.lat && latitude < bounds._northEast.lat);
  });
}

const locateOptions = {
    position: 'topright',
    keepCurrentZoomLevel: false,
    drawCircle: true,
    enableHighAccuracy: true,
    compassStyle: { radius: 2, color: '#65a' }
  };

function MapComponent() {
  const {
    dispatch,
    showPopup,
    center,
    selectedPoint,
    locationRequired,
    map,
    isFilterOn,
    selectedFilters
  } = useContext(MapContext);
  const { hotels, categories } = useContext(HotelContext);
  const [loaded, setLoaded] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState([]);
  const mapRef = createRef();
  const [types, setTypes ] = useState({})
  const [pointsToShow, setPointsToShow] = useState([]);

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

  const openFiltersCallback = () => dispatch({ type: 'ToggleFilters', showFilters: true });

  return (
    <>
      <div className={styles.map}>
        <div className={styles.mapWrapper}>
          <Map ref={mapRef} className="markercluster-map" center={center} zoom={13} maxZoom={19} onZoomEnd={calcPoints} onMoveEnd={calcPoints}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            <MarkerClusterGroup maxClusterRadius={6} zoomToBoundsOnClick={true} showCoverageOnHover={false} iconCreateFunction={createClusterCustomIcon}>
              {getMarkerList({points: visiblePoints, selectedPoint, clickCallback: onMarkerClickCallback, categories: types || {}})}
            </MarkerClusterGroup>
            <LocateControl options={locateOptions} started={locationRequired} />
          </Map>
          <div className={`${styles.extraButton} ${styles.listButton}`} onClick={openLocationListCallback}>
            <Icon img={listIcon} size="small"/>
          </div>
          <div className={`${styles.extraButton} ${styles.filterButton} ${isFilterOn ? styles.filterOn : ''}`}
            onClick={openFiltersCallback}>
            <Icon img={filterIcon} size="small"/>
          </div>
        </div>
      </div>
      {showPopup && (<Popup point={selectedPoint}/>)}
      </>
  );
}

export default MapComponent;
