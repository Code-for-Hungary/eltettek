import React, {createRef, useState, useEffect, useCallback, useContext, useMemo} from 'react';
import {Link} from "react-router-dom";
import Leaflet from "leaflet";
import {HotelContext} from '../context';
import {getMarkerList} from '../leaflet-helper.js';
import SimplePopup from '../components/SimplePopup';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import MapComponent from '../components/MapComponent';

import styles from './Hotel.module.css';
import arrowIcon from '../assets/arrow-icon.svg';

/**
 * @param {Hotel[]} hotels
 * @param {string} personName
 * @returns {Hotel[]}
 */
function getRelatedLocations(hotels, companyName) {
  return hotels
    .filter(hotel => (
      hotel.properties.company.name === companyName &&
      hotel.geometry.coordinates.length > 0
    ))
    .sort((hotel1, hotel2) => {
      const name1 = hotel1.properties.name;
      const name2 = hotel2.properties.name;

      return  name1.localeCompare(name2);
    })
    .sort((hotel1, hotel2) => {
      const name1 = hotel1.properties.name;
      const name2 = hotel2.properties.name;

      return (!name1 || !name2) ? -1 : 1;
    });
}

const Company = (props) => {
  const companyName = props.match.params.name;
  const { hotels } = useContext(HotelContext);
  const [relatedHotels, setRelatedHotels] = useState([]);
  const [current, setCurrent] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const mapRef = createRef();

  useEffect(() => {
    if (hotels && !relatedHotels.length) {
      const related = getRelatedLocations(hotels, companyName);
      setRelatedHotels(related);
      setCurrent(related[0]);
    }
  }, [hotels, relatedHotels, companyName, props.id])

  const { company, imageUrl } = current.properties || {};

  const bounds = useMemo(() => relatedHotels.length ?
    new Leaflet.LatLngBounds(relatedHotels.map(hotel => hotel.geometry.coordinates)) :
    undefined, [relatedHotels]);

  const goBack = () => {
    props.history.push('/terkep');
  };

  const onMarkerClickCallback = useCallback((point) => {
    setSelectedPoint(point)
    setShowPopup(true)
  }, []);


  const markerList = useMemo(() => {
    return relatedHotels ? getMarkerList({
      points: relatedHotels,
      selectedPoint: null,
      clickCallback: onMarkerClickCallback
    }) : []
  }, [relatedHotels, onMarkerClickCallback])

  return (
    <Layout history={props.history}>
    <div className={[styles.hotel, 'hotel'].join(' ')}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          <h1>{companyName} x <Link to={`/kekva/${company.name}`}>{company.name}</Link></h1>
          {imageUrl && 
            <div className={styles.hotelRow}>
              <div className={styles.imgWrapper}>
                <img src={imageUrl} alt='' />
              </div>
            </div>
          }
          {company && company.info && <p dangerouslySetInnerHTML={{__html: company.info}} />}
          {(relatedHotels && relatedHotels.length > 0) && (
            <>
              <div className={styles.hotelRow}>
                <h3>Kapcsolódó ingatlanok:</h3>
              </div>
              <div className={styles.hotelRow}>
                <ul>
                  {relatedHotels.map((hotel, key) => {
                    const {id, name, type, address, date, news } = hotel.properties;
                    
                    return (
                      <li key={key} className={styles.hotelItem}>
                        <Link to={`/ingatlan/${id}`}>{name || type}</Link>
                          <p>{`${name && type ? ` ${type} -` : ''} ${address}`}</p>
                        {date && <p>Adat frissítve: {date}</p>}
                        {news && 
                          <a href={news} target="new">Kapcsolódó információ</a>
                        }
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
        {relatedHotels.length > 0  &&
            <MapComponent
              mapRef={mapRef}
              markers={markerList}
              bounds={bounds}
              zoom={16}
              withClusters
            />}
          {showPopup && (<SimplePopup point={selectedPoint} close={() => setShowPopup(false)} /> )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Company;
