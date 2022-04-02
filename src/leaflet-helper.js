import {Marker} from "react-leaflet";
import React from "react";
import Leaflet from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from "./pages/Map.module.css";
import defaultMarker from './assets/markers/pink1.svg';

export function getIcon(iconUrl = '') {
  return Leaflet.icon({
    iconUrl: iconUrl || defaultMarker,
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62]
  });
}

export function createClusterCustomIcon(cluster) {
  return Leaflet.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: styles.clusterMarker,
    iconSize: Leaflet.point(40, 40, true),
  });
}


/**
 * @param {Hotel[]} points
 * @param {Hotel|null} selectedPoint? Optional.
 * @param {function(Hotel): (function(): void)} clickCallback Optional.
 * @returns {React.Component[]}
 */
export function getMarkerList({
  points,
  clickCallback = () => {},
}) {
  return points.map((point, index) => {
    const [latitude, longitude] = point.geometry.coordinates;
    const { icon } = point.properties.color;
    const MapIcon = getIcon(icon);

    return (
      <Marker position={[latitude, longitude]} key={index} icon={MapIcon} onClick={() => clickCallback(point)}/>
    );
  });
}
