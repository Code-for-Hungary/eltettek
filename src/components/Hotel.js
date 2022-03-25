import React, {useContext, useState, useEffect} from 'react';
import {Map as LeafletMap, Marker, TileLayer} from 'react-leaflet';
import Icon from './Icon.js';

import {MapContext, HotelContext} from '../context';
import {getIcon} from "../leaflet-helper.js";
import orangeIcon from "../assets/markers/orange1.svg";
import { displayName } from '../utils/helpers';

import styles from '../css/hotel.module.css';

import arrowIcon from '../assets/arrow-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

const icon = getIcon(orangeIcon);

/**
 * @typedef {Object} HotelGeometry
 * @property {string} type
 * @property {number[]} coordinates
 */

/**
 * @typedef {Object} Hotel
 * @property {HotelGeometry} geometry
 * @property {string} type
 * @property {Object} properties
 * @property {int} properties.id
 * @property {string} properties.name
 * @property {string} properties.type One of these:
 *           borászat, bár, étterem, fagyizó, fürdő, fürdő, kalandpark, kemping, kávézó, pékség, sport, szálloda, szálloda és strand, sörfőzde.
 * @property {string} properties.details
 * @property {string} properties.link
 * @property {string} properties.date
 * @property {string} properties.city
 * @property {string} properties.address
 * @property {string} properties.imageUrl
 * @property {{name: string, link: string}} properties.company
 * @property {{name: string, link: string}[]} properties.peps
 */

const Hotel = (props) => {
  const { dispatch } = useContext(MapContext);
  const { hotels } = useContext(HotelContext);
  
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (hotels) {
      const hotelById = hotels.find(hotel => hotel && hotel.properties.id === parseInt(props.id))
      setHotel(hotelById)
    }
  }, [hotels, props.id])

  const { name, imageUrl, type, company, peps, address, link, details, date } = hotel ? hotel.properties : {};
  const [lat, lng] = hotel ? hotel.geometry.coordinates : [];
  const [mainPep, ...restPeps] = peps || [];

  const goBack = () => {
      props.history.push('/map');
      dispatch({type: 'SetSelectedPoint', point: hotel});
      dispatch({type: 'SetCenter', center: [lat, lng]});
    }
  ;

  return (
    <div className={[styles.hotel, 'hotel'].join(' ')}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          <h1>{name}</h1>
          {imageUrl && <div>
            <img src={imageUrl} alt="hotel" />
          </div>}
          <div className={styles.hotelRow}>
            <p>Hely típusa: <span>{type}</span></p>
          </div>
          {company && (
            <div className={styles.hotelRow}>
              <Icon img={hotelIcon} size="small"/>
              <p>Üzemeltető:
                <span>{displayName(company)}</span>
              </p>
            </div>
          )}
          {mainPep && (
            <div className={styles.hotelRow}>
              <Icon img={horseIcon} size="small"/>
              <p>Kapcsolódó személyek:<br/>
                <div><span className={styles.pep}>
                  {displayName(mainPep, 'kuratórium elnöke')}
                </span></div>
                {restPeps && restPeps.length > 0 && restPeps.map((pep, key) => (
                  <><span key={key} className={styles.pep}>
                    {displayName(pep, 'kuratóriumi tag')}
                  </span><br/></>
                ))}
              </p>
            </div>
          )}
          {address && (
            <div className={styles.hotelRow}>
              <Icon img={pinIcon} size="small"/>
              <p>Cím: <span>{address}</span></p>
            </div>
          )}
          {link !== '' && (
            <div className={styles.hotelRow}>
              <Icon img={linkIcon} size="small"/>
              <a href={link} target="_blank" rel="noopener noreferrer"><span>Kapcsolódó cikk</span></a>
            </div>
          )}
          {details !== '' && (
            <div className={styles.hotelRow}>
              <p><span>Kapcsolódó információ:</span><br/>{details}</p>
            </div>
          )}
          {date !== '' && (
            <div className={styles.hotelRow}>
              <p>Adatok frissítve: <span>{date}</span></p>
            </div>
          )}
          <div className={styles.back} onClick={goBack}>
            <Icon img={arrowIcon} size="large"/>
          </div>
        </div>
        {hotel && <div className={`${styles.map} ${styles.staticMap}`}>
          <LeafletMap className="markercluster-map" center={[lat, lng]} zoom={17} maxZoom={19}
                      zoomControl={false}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            <Marker position={[lat, lng]} icon={icon}/>
          </LeafletMap>
        </div>}
        
      </div>
    </div>
  );
};

export default Hotel;
