import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  // Coordonnées d'Andrew's Lobsters à Bathurst, NB
  const position = [47.6181, -65.6511]; // Bathurst, New Brunswick, Canada
  const lobsterPosition = [47.6181, -65.6511]; // Position exacte d'Andrew's Lobsters

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lobsterPosition}>
          <Popup>
            <div className="text-center">
              <div className="text-2xl mb-2">🦞</div>
              <h3 className="font-bold text-blue-900">Andrew's Lobsters</h3>
              <p className="text-sm text-gray-700">1206 Pabineau Falls Road</p>
              <p className="text-sm text-gray-700">Bathurst, NB</p>
              <p className="text-sm text-blue-600 font-medium">(506) 655-5599</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
