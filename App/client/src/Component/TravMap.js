import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../Style/TravMapCSS.css';

const TravMap = () => {
    mapboxgl.accessToken = config.mapbox_access_token;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(127.084);
    const [lat, setLat] = useState(37.532608);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
      });

    // const [ Viewport, setViewport ] = useState({
    //     latitude: 37.532608,
    //     longitude: 127.084,
    //     width: '100vw',
    //     height: '100vh',
    //     zoom: 10,
    // })
 
    return (
        <div className='TravMap'>
            <div ref={mapContainer} className="map-container" />
        </div>
    )   
}

export default TravMap;