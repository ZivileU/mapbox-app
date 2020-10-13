import React, { useState, useEffect, Fragment } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import DataChart from '../dataChart/DataChart'
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

  const [dataFetch, setDataFetch] = useState({
    loading: false,
    data: null,
    error: null
  });

  const [coordinates, setCoordinates] = useState({
    latitude: 55.6961,
    longitude: 12.4800
  })

  const onViewportChange = viewport => setViewPort({...viewport})

  useEffect(() => {
    setDataFetch({loading: true});
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setDataFetch({loading: false, data: data})
      }).catch(() => {
        setDataFetch({error: 'Failed to retrieve data'})
      });
    }, [setDataFetch]);

  const greenRoutes = dataFetch.data?.features.filter(entry => entry.properties.under_kategori === 'Grøn')

  return (
    <div className='mapWrapper'>
      {dataFetch.error && <div className='error'>{dataFetch.error}</div>}
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={onViewportChange}
        onNativeClick={e => setCoordinates({latitude: e.lngLat[0], longitude: e.lngLat[1]})}
      >
        {dataFetch.data &&
          <Fragment>
            <Source
              id='bicyclePaths'
              type="geojson"
              data={dataFetch.data}
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
              data={{...dataFetch.data, features: greenRoutes, totalFeatures: greenRoutes.length}}
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
      <DataChart latitude={coordinates.latitude} longitude={coordinates.longitude} />
    </div>
  );
}

export default Map
