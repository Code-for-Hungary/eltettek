import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './views/Home';
import HotelView from './views/HotelView';
import MapView from './views/MapView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import CompanyView from './views/CompanyView';
import DataExportView from './views/DataExportView';
import DataImportView from './views/DataImportView';

import { MapContext, HotelContext } from './context';
import reducer, { initialState } from './reducer';

import { loadHotels, loadCategories } from './utils/fetchHotels';

function App () {
  const [hotels, setHotels] = React.useState(null);
  const [categories, setCategories] = React.useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadHotels();
      setHotels(data);

      const categoriesData = await loadCategories();
      setCategories(categoriesData)
    }
    
    loadData();
  }, [])

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };

  return (
    <div className="App">
      <HotelContext.Provider value={{hotels, categories}}>
        <MapContext.Provider value={mapData}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/map" exact component={MapView}/>
              <Route path="/hotel/:id" exact component={HotelView}/>
              <Route path="/about" exact component={AboutView}/>
              <Route path="/contact" exact component={ContactView}/>
              <Route path="/company/:name" exact component={CompanyView}/>
              <Route path="/data-export" exact component={DataExportView}/>
              <Route path="/data-import" exact component={DataImportView}/>
            </Switch>
          </HashRouter>
        </MapContext.Provider>
      </HotelContext.Provider>
    </div>
  );
}

export default App;
