import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css';

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

    // Create map centered on Bangalore, India
    mapRef.current = L.map(mapContainer.current).setView([12.9716, 77.5946], 13);

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

    trucks.forEach((truck) => {
      const markerId = truck.id;
      const position = [truck.latitude, truck.longitude];

      // Create truck icon HTML with better styling
      const iconHTML = `
        <div class="truck-map-icon ${truck.status} ${selectedTruck?.id === truck.id ? 'selected' : ''}">
          <div class="truck-icon-inner">
            <span class="truck-emoji">${truck.status === 'active' ? '🚚' : '🚛'}</span>
            ${truck.status === 'active' ? '<div class="pulse-ring"></div>' : ''}
          </div>
          <div class="truck-id-label">${truck.id}</div>
        </div>
      `;

      const truckIcon = L.divIcon({
        html: iconHTML,
        iconSize: [50, 60],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
        className: 'truck-icon-wrapper',
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
      }
    });
  }, [trucks, selectedTruck, onTruckSelect]);

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
