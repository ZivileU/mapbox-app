import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

const token ='pk.eyJ1Ijoieml2aWxldSIsImEiOiJja2c2aHRmMDAwZW95Mndtb2lyamRkcXFnIn0.ux3wBgiUgLiF4DXA3ogXZQ'

const Map = () => {

  const [viewport, setViewPort] = useState({
    width: 1200,
    height: 900,
    latitude: 55.6761,
    longitude: 12.5683,
    zoom: 11
  });

  const [appState, setAppState] = useState({
    loading: false,
    data: null,
  });

  const onViewportChange = viewport => setViewPort({...viewport})

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:cykeldata_kk&outputFormat=json&SRSNAME=EPSG:4326`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setAppState({loading: false, data: data})
      });
  }, [setAppState]);

  console.log(appState.data)

  return (
    <div className='mapWrapper'>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={onViewportChange}
      >
        {appState.data &&
          <Source
            id='bicyclePaths'
            type="geojson"
            data={appState.data}
          >
            <Layer
              id='bicyclePaths'
              source='bicyclePaths'
              type='line'
              paint={{
                "line-color": "#00ffff"
              }}
            />
          </Source>
        }
      </MapGL>
    </div>
  );
}

export default Map
