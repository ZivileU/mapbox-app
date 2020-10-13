import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CustomTooltip from './customTooltip/CustomTooltip'
import { mapData } from './dataChart.utility'

const apiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58'

const DataChart = () => {

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
        console.log(data)
        const filteredData = mapData(data.properties.timeseries)
        const next24h = filteredData.slice(0, 23)
        setAppState({loading: false, data: next24h})
      }).catch(() => {
        setAppState({error: 'Failed to retrieve data'})
      });
  }, [setAppState]);

  console.log(appState.data)

  return (
    <LineChart width={730} height={250} data={appState.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type='monotone' dataKey='windSpeed' stroke='#8884d8' activeDot={{ r: 6 }} />
    </LineChart>
  );
}

export default DataChart
