import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomTooltip from './customTooltip/CustomTooltip'
import { mapData } from './dataChart.utility'
import './dataChart.css'

const DataChart = ({latitude, longitude}) => {
  const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`

  const [dataFetch, setDataFetch] = useState({
    loading: false,
    data: null,
    error: null
  })

  useEffect(() => {
    let unmounted = false // To prevent state updates on an unmounted component
    setDataFetch({loading: true})

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!unmounted) {
          const filteredData = mapData(data.properties.timeseries)
          const next12h = filteredData.slice(0, 12)
          setDataFetch({loading: false, data: next12h})
        }
      }).catch(() => {
        if (!unmounted) {
          setDataFetch({error: 'Failed to retrieve data', loading: false})
        }
      })

    return () => unmounted = true

  }, [setDataFetch, apiUrl])

  return (
    <div className='dataChart'>
      {dataFetch.error && <div className='error'>{dataFetch.error}</div>}
      <h3>Wind speed for the next 12h</h3>
      {dataFetch.loading
        ? <CircularProgress />
        : (
          <LineChart width={650} height={200} data={dataFetch.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis />
            <Tooltip content={ <CustomTooltip /> } />
            <Line type='monotone' dataKey='windSpeed' stroke='#75CFF0' strokeWidth='2' activeDot={{r: 7}} />
          </LineChart>
        )
      }
      <div className='legend'>
        <span>Bicycle paths:</span>
        <span>Regular</span>
        <span>Green</span>
      </div>
    </div>
  )
}

export default DataChart
