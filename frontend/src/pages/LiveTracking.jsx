import React, { useState, useEffect } from 'react';
import '../styles/LiveTracking.css';

const LiveTracking = () => {
  const [trucks, setTrucks] = useState([
    {
      id: 'TRUCK-001',
      driver: 'John Doe',
      latitude: 40.7128,
      longitude: -74.0060,
      status: 'active',
      collectionsToday: 12,
      nextBin: 'BIN-005',
      efficiency: 92,
    },
    {
      id: 'TRUCK-002',
      driver: 'Jane Smith',
      latitude: 40.7589,
      longitude: -73.9851,
      status: 'active',
      collectionsToday: 8,
      nextBin: 'BIN-012',
      efficiency: 87,
    },
    {
      id: 'TRUCK-003',
      driver: 'Mike Johnson',
      latitude: 40.7614,
      longitude: -73.9776,
      status: 'idle',
      collectionsToday: 15,
      nextBin: 'BIN-008',
      efficiency: 95,
    },
    {
      id: 'TRUCK-004',
      driver: 'Sarah Williams',
      latitude: 40.7505,
      longitude: -73.9934,
      status: 'active',
      collectionsToday: 10,
      nextBin: 'BIN-015',
      efficiency: 89,
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7580, lng: -73.9855 });
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate truck movement every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        setTrucks(prevTrucks =>
          prevTrucks.map(truck => ({
            ...truck,
            latitude: truck.latitude + (Math.random() - 0.5) * 0.01,
            longitude: truck.longitude + (Math.random() - 0.5) * 0.01,
          }))
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#9ca3af';
  };

  const getTruckIcon = (status) => {
    return status === 'active' ? '🚚' : '🚛';
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
            <h2>Live Map</h2>
            <div className="map-controls">
              <label className="auto-refresh-toggle">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto Refresh (5s)
              </label>
            </div>
          </div>

          <div className="map-visual">
            <div className="map-placeholder">
              <p>📍 Map Integration Area</p>
              <p className="map-info">
                (Ready for Google Maps / Leaflet integration)
              </p>
            </div>

            {/* Truck Markers */}
            <div className="truck-markers">
              {trucks.map((truck, index) => (
                <div
                  key={truck.id}
                  className={`truck-marker ${selectedTruck?.id === truck.id ? 'selected' : ''}`}
                  style={{
                    left: `${((truck.longitude + 74.2) / 1.2) * 100}%`,
                    top: `${((truck.latitude - 40.6) / 0.2) * 100}%`,
                    borderColor: getStatusColor(truck.status),
                  }}
                  onClick={() => setSelectedTruck(truck)}
                  title={truck.driver}
                >
                  <span className="marker-icon">{getTruckIcon(truck.status)}</span>
                  <span className="marker-label">{truck.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Truck Info */}
          {selectedTruck && (
            <div className="selected-truck-info">
              <button className="close-btn" onClick={() => setSelectedTruck(null)}>✕</button>
              <h3>{selectedTruck.id}</h3>
              <div className="truck-info-details">
                <p><strong>👤 Driver:</strong> {selectedTruck.driver}</p>
                <p><strong>📍 Location:</strong> {selectedTruck.latitude.toFixed(4)}, {selectedTruck.longitude.toFixed(4)}</p>
                <p><strong>📦 Collections:</strong> {selectedTruck.collectionsToday}</p>
                <p><strong>🎯 Next Bin:</strong> {selectedTruck.nextBin}</p>
                <p><strong>⚡ Efficiency:</strong> {selectedTruck.efficiency}%</p>
              </div>
            </div>
          )}
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
