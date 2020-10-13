import React, { useState, useEffect, Fragment } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

const token ='pk.eyJ1Ijoieml2aWxldSIsImEiOiJja2c2aHRmMDAwZW95Mndtb2lyamRkcXFnIn0.ux3wBgiUgLiF4DXA3ogXZQ'
const apiUrl = `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:cykeldata_kk&outputFormat=json&SRSNAME=EPSG:4326`;

const Map = () => {
  const [viewport, setViewPort] = useState({
    width: 1200,
    height: 900,
    latitude: 55.6961,
    longitude: 12.4800,
    zoom: 11
  });

  const [appState, setAppState] = useState({
    loading: false,
    data: null,
    error: null
  });

  const onViewportChange = viewport => setViewPort({...viewport})

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

  const greenRoutes = appState.data?.features.filter(entry => entry.properties.under_kategori === 'Grøn')

  return (
    <div className='mapWrapper'>
      {appState.error && <div className='error'>{appState.error}</div>}
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={onViewportChange}
      >
        {appState.data &&
          <Fragment>
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
                  'line-color': 'red',
                  'line-width': 2
                }}
              />
            </Source>
            <Source
              id='greenPaths'
              type="geojson"
              data={{...appState.data, features: greenRoutes, totalFeatures: greenRoutes.length}}
            >
              <Layer
                id='greenPaths'
                source='greenPaths'
                type='line'
                paint={{
                  'line-color': 'green',
                  'line-width': 2
                }}
              />
            </Source>
          </Fragment>
        }
      </MapGL>
    </div>
  );
}

export default Map
