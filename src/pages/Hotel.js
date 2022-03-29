import React, {useMemo, useContext, useState, useEffect} from 'react';
import {Map as LeafletMap, Marker, TileLayer} from 'react-leaflet';
import {MapContext, HotelContext} from '../context';
import Icon from '../components/Icon.js';
import Layout from '../components/Layout';
import {getIcon} from "../leaflet-helper.js";
import { displayName } from '../utils/helpers';
import styles from './Hotel.module.css';

import arrowIcon from '../assets/arrow-icon.svg';


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
  const { id } = props.match.params;
  const { dispatch } = useContext(MapContext);
  const { hotels } = useContext(HotelContext);

  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (hotels) {
      const hotelById = hotels.find(hotel => hotel && hotel.properties.id === parseInt(id))
      setHotel(hotelById)
    }
  }, [hotels, id])

  const icon = useMemo(() => {
    const marker = hotel && hotel.properties.color.icon ? hotel.properties.color.icon : '';
    return getIcon(marker);
  }, [hotel]);

  // const icon = getIcon(blueIcon);


  const { name, imageUrl, type, company, peps, address, link, details, date } = hotel ? hotel.properties : {};
  const [lat, lng] = hotel ? hotel.geometry.coordinates : [];
  const [mainPep, ...restPeps] = peps || [];

  const goBack = () => {
      props.history.push('/terkep');
      dispatch({type: 'SetSelectedPoint', point: hotel});
      dispatch({type: 'SetCenter', center: [lat, lng]});
    }
  ;

  return (
    <Layout history={props.history}>
      <div className={[styles.hotel, 'hotel'].join(' ')}>
        <div className={styles.hotelWrapper}>
          <div className={styles.info}>
            <h1>{name}</h1>
            {imageUrl && <div className={styles.hotelRow}>
              <div className={styles.imgWrapper}>
                <img src={imageUrl} alt="hotel" />
              </div>
            </div>}
            {type && <div className={styles.hotelRow}>
              <span>Hely típusa</span>
              <p>{type}</p>
            </div>}
            {company && (
              <div className={styles.hotelRow}>
                <span>Tulajdonos</span>
                <p>{displayName(company)}</p>
              </div>
            )}
            {mainPep && (
              <div className={styles.hotelRow}>
                <span>Kapcsolódó személyek</span>
                  <p key="main" className={styles.pep}>
                    {displayName(mainPep, 'kuratórium elnöke')}
                  </p>
                  {restPeps && restPeps.length > 0 && restPeps.map((pep, key) => (
                    <React.Fragment key={key}>
                      <p className={styles.pep}>
                        {displayName(pep, 'kuratóriumi tag')}
                      </p>
                    </React.Fragment>
                  ))}
              </div>
            )}
            {address && (
              <div className={styles.hotelRow}>
                <span>Cím: </span>
                <p>{address}</p>
              </div>
            )}
            {details !== '' && (
              <div className={styles.hotelRow}>
                <p><span>HRSZ:</span><br/>{details}</p>
              </div>
            )}
            {link !== '' && (
              <div className={styles.hotelRow}>
                <a href={link} target="_blank" rel="noopener noreferrer"><span>Kapcsolódó cikk</span></a>
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
            <LeafletMap className="markercluster-map" center={[lat, lng]} zoom={17} maxZoom={19} zoomControl={false}>
              <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
              />
              <Marker position={[lat, lng]} icon={icon}/>
            </LeafletMap>
          </div>}
        </div>
      </div>
    </Layout>
  );
};

export default Hotel;
