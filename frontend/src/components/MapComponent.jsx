import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ trucks, selectedTruck, onTruckSelect }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // Create map centered on Bangalore, India
    mapRef.current = L.map(mapContainer.current).setView([12.9716, 77.5946], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update truck markers
  useEffect(() => {
    if (!mapRef.current) return;

    trucks.forEach((truck) => {
      const markerId = truck.id;
      const position = [truck.latitude, truck.longitude];

      // Custom truck icon
      const truckIcon = L.divIcon({
        html: `
          <div class="truck-icon ${truck.status}" style="
            width: 40px;
            height: 40px;
            background: ${truck.status === 'active' ? '#10b981' : '#9ca3af'};
            border: 3px solid ${selectedTruck?.id === truck.id ? '#3b82f6' : 'white'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            animation: ${truck.status === 'active' ? 'pulse 2s infinite' : 'none'};
          ">
            ${truck.status === 'active' ? '🚚' : '🚛'}
          </div>
        `,
        iconSize: [40, 40],
        className: 'truck-marker-icon',
      });

      if (markersRef.current[markerId]) {
        // Update existing marker
        markersRef.current[markerId].setLatLng(position);
        markersRef.current[markerId].setIcon(truckIcon);
      } else {
        // Create new marker
        const marker = L.marker(position, { icon: truckIcon }).addTo(mapRef.current);
        
        // Popup with truck info
        marker.bindPopup(`
          <div style="width: 250px; padding: 10px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">${truck.id}</h3>
            <p><strong>Driver:</strong> ${truck.driver}</p>
            <p><strong>Status:</strong> <span style="color: ${truck.status === 'active' ? '#10b981' : '#9ca3af'}; font-weight: bold;">${truck.status.toUpperCase()}</span></p>
            <p><strong>Speed:</strong> ${truck.speed} km/h</p>
            <p><strong>Collections:</strong> ${truck.collectionsToday}</p>
            <p><strong>Waste Collected:</strong> ${truck.wasteCollected.toFixed(1)} kg</p>
            <p><strong>Next Bin:</strong> ${truck.nextBin}</p>
            <p><strong>Efficiency:</strong> ${truck.efficiency}%</p>
            <p><strong>Coordinates:</strong> ${truck.latitude.toFixed(4)}°N, ${truck.longitude.toFixed(4)}°E</p>
            <button onclick="window.mapTruckSelect('${truck.id}')" style="
              width: 100%;
              padding: 8px;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: bold;
            ">View Details</button>
          </div>
        `);

        marker.on('click', () => onTruckSelect(truck));
        markersRef.current[markerId] = marker;
      }
    });
  }, [trucks, selectedTruck, onTruckSelect]);

  // Center map on selected truck
  useEffect(() => {
    if (selectedTruck && mapRef.current) {
      mapRef.current.setView(
        [selectedTruck.latitude, selectedTruck.longitude],
        15,
        { animate: true }
      );
    }
  }, [selectedTruck]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    />
  );
};

export default MapComponent;
