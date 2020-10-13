import React, { useState, useEffect } from 'react'
import './DisplayData.css'

const apiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58'

const DisplayData = () => {
  const [appState, setAppState] = useState({
    loading: false,
    data: null,
    error: null
  });

  useEffect(() => {
    setAppState({loading: true});
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setAppState({loading: false, data: data})
      }).catch(() => {
        setAppState({error: 'Failed to retrieve data'})
      });
  }, [setAppState]);

  console.log(appState.data)

  return (
    <div className='dataWrapper'>Data</div>
  );
}

export default DisplayData
