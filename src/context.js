import React from 'react';

const mapValue = {
  list: [],
  map: null,
  center: [],
  selectedPoint: null,
  selectedFilters: [],
  isFilterOn: false,
  locationRequired: false,
  showPopup: false,
  showMenu: false,
  showList: false,
  showFilters: false,
  dispatch: () => {}
};

export const MapContext = React.createContext(mapValue);

const hotelValue = {
  hotels: [],
  categories: {}
};

export const HotelContext = React.createContext(hotelValue);
