import React, { useState } from 'react'
import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

const token ='pk.eyJ1Ijoieml2aWxldSIsImEiOiJja2c2aHRmMDAwZW95Mndtb2lyamRkcXFnIn0.ux3wBgiUgLiF4DXA3ogXZQ'

const Map = () => {

  const [viewport, setViewPort ] = useState({
    width: 1200,
    height: 900,
    latitude: 55.6761,
    longitude: 12.5683,
    zoom: 11
  })

  const onViewportChange = viewport => setViewPort({...viewport})

  return (
    <div className='mapWrapper'>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={onViewportChange}
      />
    </div>
  )
}

export default Map
