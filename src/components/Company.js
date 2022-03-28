import React, {createRef, useState, useEffect, useCallback, useContext, useMemo} from 'react';
import {Link} from "react-router-dom";
import Leaflet from "leaflet";
import {Map, TileLayer} from 'react-leaflet';
import {HotelContext} from '../context';
import {getMarkerList} from '../leaflet-helper.js';
import SimplePopup from '../components/SimplePopup';

import Icon from './Icon.js';

import styles from '../css/hotel.module.css';
import arrowIcon from '../assets/arrow-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';


/**
 * @param {Hotel[]} hotels
 * @param {string} personName
 * @returns {Hotel[]}
 */
function _getRelatedLocations(hotels, companyName) {
  return hotels.filter(
    hotel => hotel.properties.company.name === companyName);
}

const Company = (props) => {
  const companyName = props.name;
  const { hotels, categories } = useContext(HotelContext);
  const [relatedHotels, setrelatedHotels] = useState([]);
  const [current, setCurrent] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const mapRef = createRef();

  useEffect(() => {
    if (hotels && !relatedHotels.length) {
      const related = _getRelatedLocations(hotels, companyName);
      setrelatedHotels(related.filter(hotel => hotel.geometry.coordinates.length > 0));
      setCurrent(related[0]);
    }
  }, [hotels, relatedHotels, companyName, props.id])

  const { company, imageUrl } = current.properties || {};

  const bounds = useMemo(() => relatedHotels.length ?
    new Leaflet.LatLngBounds(relatedHotels.map(hotel => hotel.geometry.coordinates)) :
    undefined, [relatedHotels]);

  const goBack = () => {
      props.history.push('/terkep');
    }
  ;

  const onMarkerClickCallback = useCallback((point) => {
    setShowPopup(true)
    setSelectedPoint(point)
  }, []);


  const markerList = useMemo(() => {
    return categories ? relatedHotels && getMarkerList({
      points: relatedHotels,
      selectedPoint: null,
      clickCallback: onMarkerClickCallback,
      categories
    }) : []
  }, [categories, relatedHotels, onMarkerClickCallback])

  return (
    <div className={[styles.hotel, 'hotel'].join(' ')}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          <h1>{companyName}</h1>
          {imageUrl && <img src={imageUrl} alt='' />}
          {company && company.info && <p>{company.info}</p>}
          {(relatedHotels && relatedHotels.length > 0) && (
            <>
              <div className={styles.hotelRow}>
                <Icon img={hotelIcon} size="small"/>
                <p>Kapcsolódó helyszínek:</p>
              </div>
              <div className={styles.hotelRow}>
                <ul>
                  {relatedHotels.map((hotel, key) => {
                    const {id, name, type, address, date, details } = hotel.properties;
                    
                    return (
                      <li key={key} className={styles.pep}>
                        <Link to={`/ingatlan/${id}`}>{name}</Link>
                        <span className={styles.title}>{`${type ? type : ''} ${address ? `– ${address}` : ''} ${date ? `- Adat frissítve: ${date}` : ''}`}</span>
                        {details && <p><span>Kapcsolódó információ:</span> {details}</p>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )}
          <div className={styles.back} onClick={goBack}>
            <Icon img={arrowIcon} size="large"/>
          </div>
        </div>
        <div className={styles.map}>
        {relatedHotels.length &&
          <Map ref={mapRef} className="markercluster-map" zoom={16} maxZoom={20} bounds={bounds}>
              <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
              />
                {markerList}
            </Map>}
        </div>
        {showPopup && (<SimplePopup point={selectedPoint} close={() => setShowPopup(false)} /> )}
      </div>
    </div>
  );
};

export default Company;
