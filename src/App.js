import React from 'react';
import Map from './components/map/Map'
import './App.css';

function App() {
  return (
    <div className="App">
      <Map apiUrl='https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:cykeldata_kk&outputFormat=json&SRSNAME=EPSG:4326'/>
    </div>
  );
}

export default App;
