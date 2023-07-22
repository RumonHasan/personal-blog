import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapStyles.css';
import { locationCoords } from '../../utils/Coords';

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [destinationCount] = useState(locationCoords.length);
  const [lng] = useState(139.6917);
  const [lat] = useState(35.6895);
  const [zoom] = useState(10);
  // egde coordinates of host country -> Japan
  const [southBounds] = useState([122.0, 20.0]);
  const [northBounds] = useState([153.0, 45.0]);
  // markers of visited places
  const [markers] = useState(locationCoords);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      accessToken: import.meta.env.VITE_MAP_BOX_TOKEN,
    });
    // fitting the bounds of Japan map
    map.current.fitBounds([northBounds, southBounds]);
    // adding the markers
    markers.map((marker) => {
      const { coords } = marker;
      new mapboxgl.Marker().setLngLat(coords).addTo(map.current);
    });
  }, [lat, lng, markers, northBounds, southBounds, zoom]);

  return (
    <div className="container">
      <div className="sidebar">Destination Count: {destinationCount}</div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
