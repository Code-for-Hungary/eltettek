import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import LocateControl from '../components/LocateControl';
import {createClusterCustomIcon} from '../leaflet-helper.js';

const locateOptions = {
  position: 'topright',
  keepCurrentZoomLevel: false,
  drawCircle: true,
  enableHighAccuracy: true,
  compassStyle: { radius: 2, color: '#65a' }
};

function MapComponent(props) {
  const { mapRef, markers, center, onChange, withClusters, withLocate, locationRequired } = props;

  return (
    <Map ref={mapRef}
      className="markercluster-map"
      center={center}
      zoom={13}
      maxZoom={19}
      onZoomEnd={onChange}
      onMoveEnd={onChange}
    >
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
      />
      {withClusters ? (
        <MarkerClusterGroup maxClusterRadius={12} zoomToBoundsOnClick={true} showCoverageOnHover={false} iconCreateFunction={createClusterCustomIcon}>
          {markers}
        </MarkerClusterGroup>
      ) : 
        markers
      }
      {withLocate && <LocateControl options={locateOptions} started={locationRequired} />}
  </Map>
  );
}

export default MapComponent;
