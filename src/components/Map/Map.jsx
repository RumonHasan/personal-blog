import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapStyles.css';

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('139.839478');
  const [lat, setLat] = useState('35.652832');
  const [zoom, setZoom] = useState(9);

  // adding own location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('location not found');
    }
  }, []);

  // initializing the map app
  useEffect(() => {
    console.log(lng, lng);
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      accessToken: import.meta.env.VITE_MAP_BOX_TOKEN,
    });
  }, [lat, lng, zoom]);

  return (
    <div className="container">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
