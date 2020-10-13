import React from 'react';
// import { Favorite } from '@material-ui/icons';
import Map from './components/map/Map'
import DataChart from './components/dataChart/DataChart'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Favorite color="secondary" fontSize="large" /> */}
      <Map />
      <DataChart />
    </div>
  );
}

export default App;
