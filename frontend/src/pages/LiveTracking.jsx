import React, { useState, useEffect } from 'react';
import '../styles/LiveTracking.css';
import MapComponent from '../components/MapComponent';

const LiveTracking = () => {
  const [trucks, setTrucks] = useState([
    {
      id: 'TRK-001',
      driver: 'Rajesh Kumar',
      latitude: 12.9716,
      longitude: 77.5946,
      status: 'active',
      collectionsToday: 12,
      nextBin: 'BIN-045',
      efficiency: 92,
      speed: 25,
      wasteCollected: 245,
    },
    {
      id: 'TRK-002',
      driver: 'Arjun Singh',
      latitude: 12.9352,
      longitude: 77.6245,
      status: 'active',
      collectionsToday: 8,
      nextBin: 'BIN-067',
      efficiency: 87,
      speed: 18,
      wasteCollected: 198,
    },
    {
      id: 'TRK-003',
      driver: 'Priya Sharma',
      latitude: 12.8349,
      longitude: 77.6645,
      status: 'idle',
      collectionsToday: 15,
      nextBin: 'BIN-089',
      efficiency: 95,
      speed: 0,
      wasteCollected: 142,
    },
    {
      id: 'TRK-004',
      driver: 'Vikram Patel',
      latitude: 12.9689,
      longitude: 77.5456,
      status: 'active',
      collectionsToday: 10,
      nextBin: 'BIN-023',
      efficiency: 89,
      speed: 22,
      wasteCollected: 187,
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState({ lat: 12.95, lng: 77.6 });
  // const [showSpeedometer, setShowSpeedometer] = useState(true);

  // Simulate truck movement every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        setTrucks(prevTrucks =>
          prevTrucks.map(truck => ({
            ...truck,
            // Random small movements simulating real GPS data
            latitude: truck.latitude + (Math.random() - 0.5) * 0.005,
            longitude: truck.longitude + (Math.random() - 0.5) * 0.005,
            // Speed changes for active trucks
            speed: truck.status === 'active' 
              ? Math.floor(Math.random() * 40) + 10 
              : 0,
            // Occasionally update waste collected
            wasteCollected: truck.wasteCollected + (truck.status === 'active' ? Math.random() * 5 : 0),
          }))
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Update map center to follow selected truck
  useEffect(() => {
    if (selectedTruck) {
      setMapCenter({ lat: selectedTruck.latitude, lng: selectedTruck.longitude });
    }
  }, [selectedTruck]);

  // const getStatusColor = (status) => {
  //   return status === 'active' ? '#10b981' : '#9ca3af';
  // };

  const getTruckIcon = (status) => {
    return status === 'active' ? '🚚' : '🚛';
  };

  const getSpeedColor = (speed) => {
    if (speed === 0) return '#9ca3af';
    if (speed < 15) return '#fbbf24';
    if (speed < 30) return '#10b981';
    return '#ef4444';
  };

  // Convert GPS coordinates to map position (percentage)
  const coordToMapPosition = (lat, lng) => {
    const mapWidth = 77.8;
    const mapHeight = 0.4;
    const centerLat = mapCenter.lat;
    const centerLng = mapCenter.lng;
    
    // Calculate position relative to map center
    const left = 50 + ((lng - centerLng) / mapWidth) * 100 * mapZoom;
    const top = 50 + ((lat - centerLat) / mapHeight) * 100 * mapZoom;
    
    return { left, top };
  };

  return (
    <div className="live-tracking-page">
      <div className="tracking-header">
        <h1>🗺️ Live Truck Tracking</h1>
        <p>Real-time vehicle locations and collection status</p>
      </div>

      <div className="tracking-content">
        {/* Map Section */}
        <div className="map-container">
          <div className="map-header">
            <div className="map-title-section">
              <h2>📍 Live Fleet Map</h2>
              <p className="map-subtitle">Real-time GPS tracking of all trucks</p>
            </div>
            <div className="map-controls">
              <button 
                className="zoom-btn"
                onClick={() => setMapZoom(Math.min(mapZoom + 0.5, 3))}
                title="Zoom In"
              >
                🔍+
              </button>
              <button 
                className="zoom-btn"
                onClick={() => setMapZoom(Math.max(mapZoom - 0.5, 0.5))}
                title="Zoom Out"
              >
                🔍−
              </button>
              <label className="auto-refresh-toggle">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto Refresh
              </label>
            </div>
          </div>

          <div className="map-visual">
            <MapComponent 
              trucks={trucks}
              selectedTruck={selectedTruck}
              onTruckSelect={setSelectedTruck}
            />

            {/* Selected Truck Info Panel */}
            {selectedTruck && (
              <div className="selected-truck-panel">
                <button className="close-btn" onClick={() => setSelectedTruck(null)}>✕</button>
                
                <div className="panel-header">
                  <h3>{selectedTruck.id}</h3>
                  <span className={`status-badge ${selectedTruck.status}`}>
                    {selectedTruck.status === 'active' ? '🟢 Active' : '⚪ Idle'}
                  </span>
                </div>

                <div className="panel-content">
                  {/* Driver Info */}
                  <div className="info-section">
                    <h4>Driver Information</h4>
                    <p>👤 <strong>{selectedTruck.driver}</strong></p>
                  </div>

                  {/* Live Location */}
                  <div className="info-section">
                    <h4>Live Location</h4>
                    <p className="location-coords">
                      📍 {selectedTruck.latitude.toFixed(6)}°N<br/>
                      📍 {selectedTruck.longitude.toFixed(6)}°E
                    </p>
                  </div>

                  {/* Speed & Movement */}
                  {selectedTruck.status === 'active' && (
                    <div className="info-section">
                      <h4>Speed & Movement</h4>
                      <div className="speed-display">
                        <div className="speed-gauge">
                          <div className="speed-value" style={{ color: getSpeedColor(selectedTruck.speed) }}>
                            {Math.round(selectedTruck.speed)} km/h
                          </div>
                          <div className="speed-bar">
                            <div 
                              className="speed-fill" 
                              style={{ width: `${(selectedTruck.speed / 50) * 100}%`, backgroundColor: getSpeedColor(selectedTruck.speed) }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collections Stats */}
                  <div className="info-section">
                    <h4>Collection Statistics</h4>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-label">Collections</span>
                        <span className="stat-value">{selectedTruck.collectionsToday}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Waste (kg)</span>
                        <span className="stat-value">{Math.round(selectedTruck.wasteCollected)}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Efficiency</span>
                        <span className="stat-value">{selectedTruck.efficiency}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Collection */}
                  <div className="info-section">
                    <h4>Next Collection</h4>
                    <p className="next-bin">🎯 {selectedTruck.nextBin}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trucks List */}
        <div className="trucks-list-container">
          <h2>Active Trucks</h2>
          <div className="trucks-list">
            {trucks.map((truck) => (
              <div
                key={truck.id}
                className={`truck-item ${selectedTruck?.id === truck.id ? 'selected' : ''}`}
                onClick={() => setSelectedTruck(truck)}
              >
                <div className="truck-header">
                  <div className="truck-id-driver">
                    <span className="truck-id">{truck.id}</span>
                    <span className={`status-indicator ${truck.status}`}></span>
                  </div>
                  <span className="driver-name">{truck.driver}</span>
                </div>

                <div className="truck-stats">
                  <div className="stat">
                    <span className="label">Collections</span>
                    <span className="value">{truck.collectionsToday}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Next Bin</span>
                    <span className="value">{truck.nextBin}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Efficiency</span>
                    <span className="value">{truck.efficiency}%</span>
                  </div>
                </div>

                <div className="efficiency-bar">
                  <div
                    className="efficiency-fill"
                    style={{ width: `${truck.efficiency}%` }}
                  ></div>
                </div>

                <div className="truck-location">
                  <span className="coordinates">
                    📍 {truck.latitude.toFixed(4)}, {truck.longitude.toFixed(4)}
                  </span>
                  <span className={`status-text ${truck.status}`}>
                    {truck.status === 'active' ? '🟢 Active' : '⚪ Idle'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="tracking-summary">
        <div className="summary-card">
          <h3>Total Active Trucks</h3>
          <p className="summary-value">{trucks.filter(t => t.status === 'active').length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Collections</h3>
          <p className="summary-value">{trucks.reduce((sum, t) => sum + t.collectionsToday, 0)}</p>
        </div>
        <div className="summary-card">
          <h3>Average Efficiency</h3>
          <p className="summary-value">
            {Math.round(trucks.reduce((sum, t) => sum + t.efficiency, 0) / trucks.length)}%
          </p>
        </div>
        <div className="summary-card">
          <h3>Fleet Status</h3>
          <p className="summary-value" style={{ color: '#10b981' }}>Healthy</p>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
