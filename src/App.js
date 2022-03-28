import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Hotel from './pages/Hotel';
import Map from './pages/Map';
import About from './pages/About';
import Contact from './pages/Contact';
import Company from './pages/Company';
import DataExport from './pages/DataExport';
import DataImport from './pages/DataImport';

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
              <Route path="/terkep" exact component={Map}/>
              <Route path="/ingatlan/:id" exact component={Hotel}/>
              <Route path="/projekt" exact component={About}/>
              <Route path="/kontakt" exact component={Contact}/>
              <Route path="/kekva/:name" exact component={Company}/>
              <Route path="/data-export" exact component={DataExport}/>
              <Route path="/data-import" exact component={DataImport}/>
            </Switch>
          </HashRouter>
        </MapContext.Provider>
      </HotelContext.Provider>
    </div>
  );
}

export default App;
