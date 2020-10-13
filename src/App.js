import React from 'react';
// import { Favorite } from '@material-ui/icons';
import Map from './components/map/Map'
import DisplayData from './components/displayData/DisplayData'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Favorite color="secondary" fontSize="large" /> */}
      <Map />
      <DisplayData />
    </div>
  );
}

export default App;
