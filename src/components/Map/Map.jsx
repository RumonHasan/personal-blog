import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapStyles.css';
import { locationCoords } from '../../utils/Coords';
import { Tooltip } from '@mui/material';

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [destinationCounter, setDestinationCounter] = useState({
    tripCounter: 0,
    hikeCounter: 0,
  });
  const [lng] = useState(139.6917);
  const [lat] = useState(35.6895);
  const [zoom] = useState(10);
  // egde coordinates of host country -> Japan
  const [southBounds] = useState([122.0, 20.0]);
  const [northBounds] = useState([153.0, 45.0]);
  // markers of visited places
  const [markers] = useState(locationCoords);

  // getting trips and location counts
  useEffect(() => {
    let tripCount = 0;
    let hikeCount = 0;
    for (let index = 0; index < locationCoords.length; index++) {
      locationCoords[index].type === 'hike' && hikeCount++;
      locationCoords[index].type === 'trip' && tripCount++;
    }
    setDestinationCounter({
      tripCounter: tripCount,
      hikeCounter: hikeCount,
    });
  }, []);

  // get custom icon marker based on type
  const getCustomMarkerIconElement = (type) => {
    const iconMarkupEl = document.createElement('div');
    iconMarkupEl.classList.add(`${type}-marker`);
    iconMarkupEl.classList.add('zoom-animation');
    return iconMarkupEl;
  };

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
      const { coords, type } = marker;
      new mapboxgl.Marker().setLngLat(coords).addTo(map.current);
    });
  }, [lat, lng, markers, northBounds, southBounds, zoom]);

  return (
    <div className="container">
      <Tooltip title="Displays the locations only the blogged hike and trip counts!">
        <div className="sidebar">
          Trips: {destinationCounter.tripCounter}, Hikes:{' '}
          {destinationCounter.hikeCounter}{' '}
        </div>
      </Tooltip>

      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
