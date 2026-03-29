import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css';

// Add pulse animation globally
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse-ring {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`;
document.head.appendChild(style);

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
  const [zoom, setZoom] = useState(13);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    console.log('🗺️ Initializing Leaflet map...');
    console.log('🗺️ Map container:', mapContainer.current);
    console.log('🗺️ Leaflet version:', L.version);

    // Create map centered on Bangalore, India
    mapRef.current = L.map(mapContainer.current).setView([12.9716, 77.5946], 13);
    console.log('✅ Map created successfully:', mapRef.current);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Track zoom level
    mapRef.current.on('zoomend', () => {
      setZoom(mapRef.current.getZoom());
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update truck markers
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('🚚 Rendering markers for trucks:', trucks);

    // First, clear all existing markers
    Object.values(markersRef.current).forEach(marker => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = {};

    trucks.forEach((truck) => {
      const markerId = truck.id;
      const position = [truck.latitude, truck.longitude];
      console.log(`Creating marker for ${markerId} at`, position);

      // Create truck icon using a simple div approach
      const emoji = truck.status === 'active' ? '🚚' : '🚛';
      
      // Create a simple HTML element with just the emoji
      const iconHTML = `<div style="font-size: 32px; line-height: 1; text-align: center; margin: 0; padding: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">${emoji}</div>`;

      const truckIcon = L.divIcon({
        html: iconHTML,
        iconSize: [40, 40],
        iconAnchor: [20, 35],
        popupAnchor: [0, -30],
        className: 'truck-marker-div',
      });

      // Create new marker
      console.log(`📍 Adding marker to map for ${markerId}`);
      const marker = L.marker(position, { icon: truckIcon, title: markerId }).addTo(mapRef.current);
      console.log(`✅ Marker added to map:`, marker);
        
      // Popup with truck info
      marker.bindPopup(`
        <div class="truck-popup-content">
          <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${truck.id}</h4>
          <div class="popup-info">
            <div class="info-row">
              <span class="info-label">Driver:</span>
              <span class="info-value">${truck.driver}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span class="info-value status ${truck.status}">${truck.status.toUpperCase()}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Speed:</span>
              <span class="info-value">${truck.speed} km/h</span>
            </div>
            <div class="info-row">
              <span class="info-label">Collections:</span>
              <span class="info-value">${truck.collectionsToday}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Waste:</span>
              <span class="info-value">${truck.wasteCollected.toFixed(1)} kg</span>
            </div>
            <div class="info-row">
              <span class="info-label">Next Bin:</span>
              <span class="info-value">${truck.nextBin}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Efficiency:</span>
              <span class="info-value">${truck.efficiency}%</span>
            </div>
          </div>
        </div>
      `, { maxWidth: 280 });

      marker.on('click', () => onTruckSelect(truck));
      markersRef.current[markerId] = marker;
    });
  }, [trucks, selectedTruck, onTruckSelect]);

  // Log markers count
  useEffect(() => {
    console.log(`📊 Total markers on map:`, Object.keys(markersRef.current).length);
  });

  // Open popup when a truck is selected
  useEffect(() => {
    if (selectedTruck && mapRef.current && markersRef.current[selectedTruck.id]) {
      const marker = markersRef.current[selectedTruck.id];
      console.log(`🎯 Opening popup for selected truck: ${selectedTruck.id}`);
      
      // Close all other popups
      Object.values(markersRef.current).forEach(m => {
        mapRef.current.closePopup(m.getPopup());
      });
      
      // Open the selected truck's popup
      marker.openPopup();
      
      // Pan to the truck location
      mapRef.current.setView(marker.getLatLng(), 15, { animate: true });
    }
  }, [selectedTruck]);

  // Handle zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([12.9716, 77.5946], 13, { animate: true });
    }
  };

  return (
    <div className="map-component-container">
      <div className="map-controls-overlay">
        <button onClick={handleZoomIn} className="map-control-btn" title="Zoom In">
          🔍+
        </button>
        <button onClick={handleZoomOut} className="map-control-btn" title="Zoom Out">
          🔍−
        </button>
        <button onClick={handleResetView} className="map-control-btn" title="Reset View">
          🎯
        </button>
      </div>
      <div
        ref={mapContainer}
        className="map-container-main"
      />
      <div className="map-legend-overlay">
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Legend</h4>
        <div className="legend-item">
          <span style={{ fontSize: '20px' }}>🚚</span>
          <span>Active Truck</span>
        </div>
        <div className="legend-item">
          <span style={{ fontSize: '20px' }}>🚛</span>
          <span>Idle Truck</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
