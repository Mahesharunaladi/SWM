import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ sidebarOpen }) => {
  const [stats, setStats] = useState({
    activeBins: 1247,
    avgFillLevel: 68,
    collectionsToday: 12,
    carbonSaved: 2345,
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      bin: 'BIN-001',
      location: 'Main Street',
      status: 'Collected',
      timestamp: '2024-01-15 10:30 AM',
    },
    {
      id: 2,
      bin: 'BIN-012',
      location: 'Park Avenue',
      status: 'Full',
      timestamp: '2024-01-15 10:15 AM',
    },
    {
      id: 3,
      bin: 'BIN-045',
      location: 'Downtown Center',
      status: 'Normal',
      timestamp: '2024-01-15 09:45 AM',
    },
    {
      id: 4,
      bin: 'BIN-087',
      location: 'Shopping Mall',
      status: 'Maintenance',
      timestamp: '2024-01-15 09:30 AM',
    },
  ]);

  const [filters, setFilters] = useState('today');

  // Truck & Driver Data with Route Information
  const [trucks, setTrucks] = useState([
    {
      id: 1,
      truckNo: 'TRK-001',
      driver: 'Rajesh Kumar',
      phone: '98765-43210',
      currentLocation: '12.9716° N, 77.5946° E',
      status: 'Active',
      collected: ['BIN-001', 'BIN-002', 'BIN-012'],
      pending: ['BIN-045', 'BIN-067', 'BIN-089'],
      totalWaste: 245,
      efficiency: '92%',
    },
    {
      id: 2,
      truckNo: 'TRK-002',
      driver: 'Arjun Singh',
      phone: '99876-54321',
      currentLocation: '12.9352° N, 77.6245° E',
      status: 'Active',
      collected: ['BIN-015', 'BIN-023', 'BIN-034'],
      pending: ['BIN-055', 'BIN-078', 'BIN-091'],
      totalWaste: 198,
      efficiency: '88%',
    },
    {
      id: 3,
      truckNo: 'TRK-003',
      driver: 'Priya Sharma',
      phone: '98765-12345',
      currentLocation: '12.8349° N, 77.6645° E',
      status: 'Idle',
      collected: ['BIN-041', 'BIN-052'],
      pending: ['BIN-063', 'BIN-074', 'BIN-085', 'BIN-096'],
      totalWaste: 142,
      efficiency: '85%',
    },
  ]);

  // Handle filter button clicks
  const handleFilterClick = (filterType) => {
    setFilters(filterType);
    console.log(`Filter changed to: ${filterType}`);
  };

  // Handle view all link
  const handleViewAll = (e) => {
    e.preventDefault();
    alert('View All Activity - Full history will be displayed');
    console.log('View All clicked');
  };

  // Handle action button click
  const handleActionClick = (binId, location) => {
    alert(`Viewing details for ${binId} at ${location}`);
    console.log(`Action clicked for ${binId} at ${location}`);
  };

  // Handle chart options
  const handleChartOptions = (chartName) => {
    alert(`Chart options for ${chartName}`);
    console.log(`Chart options clicked for ${chartName}`);
  };

  // Handle truck click for details
  const handleTruckClick = (truck) => {
    console.log('Truck details:', truck);
    alert(`
Truck: ${truck.truckNo}
Driver: ${truck.driver}
Phone: ${truck.phone}
Location: ${truck.currentLocation}
Status: ${truck.status}
Efficiency: ${truck.efficiency}
Total Waste Collected: ${truck.totalWaste} kg
    `);
  };

  // Handle driver contact
  const handleCallDriver = (e, driverPhone, driverName) => {
    e.stopPropagation();
    alert(`Calling ${driverName} at ${driverPhone}`);
    console.log(`Call initiated to ${driverName}`);
  };

  // Handle view route details
  const handleViewRoute = (e, truckNo) => {
    e.stopPropagation();
    alert(`Route details for ${truckNo} - Navigate to Live Tracking for real-time map`);
    console.log(`View route for ${truckNo}`);
  };

  return (
    <div className={`dashboard-page ${!sidebarOpen ? 'full-width' : ''}`}>
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard Overview</h2>
          <p className="dashboard-date">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filters === 'today' ? 'active' : ''}`}
            onClick={() => handleFilterClick('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filters === 'week' ? 'active' : ''}`}
            onClick={() => handleFilterClick('week')}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${filters === 'month' ? 'active' : ''}`}
            onClick={() => handleFilterClick('month')}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🗑️</div>
          <div className="stat-label">Active Bins</div>
          <div className="stat-value">{stats.activeBins}</div>
          <div className="stat-change">
            <span>↑ 12%</span> from last week
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-icon">📊</div>
          <div className="stat-label">Avg Fill Level</div>
          <div className="stat-value">{stats.avgFillLevel}%</div>
          <div className="stat-change">
            <span>→</span> stable
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">🚚</div>
          <div className="stat-label">Collections Today</div>
          <div className="stat-value">{stats.collectionsToday}</div>
          <div className="stat-change">
            <span>↑ 8%</span> from yesterday
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">♻️</div>
          <div className="stat-label">Carbon Saved (kg)</div>
          <div className="stat-value">{stats.carbonSaved}</div>
          <div className="stat-change">
            <span>↑ 25%</span> this month
          </div>
        </div>
      </div>

      {/* Live Truck Tracking Section */}
      <div className="trucks-section">
        <h2 className="section-title">🚛 Live Truck Tracking & Driver Details</h2>
        <div className="trucks-grid">
          {trucks.map((truck) => (
            <div 
              key={truck.id} 
              className={`truck-card ${truck.status.toLowerCase()}`}
              onClick={() => handleTruckClick(truck)}
            >
              {/* Truck Header */}
              <div className="truck-header">
                <div className="truck-info">
                  <h3 className="truck-number">{truck.truckNo}</h3>
                  <span className={`truck-status ${truck.status.toLowerCase()}`}>
                    🔴 {truck.status}
                  </span>
                </div>
                <div className="truck-efficiency">{truck.efficiency}</div>
              </div>

              {/* Driver Details */}
              <div className="driver-section">
                <div className="driver-info">
                  <div className="driver-name">👨‍💼 {truck.driver}</div>
                  <div className="driver-phone">📱 {truck.phone}</div>
                </div>
                <div className="driver-actions">
                  <button 
                    className="action-icon-btn"
                    onClick={(e) => handleCallDriver(e, truck.phone, truck.driver)}
                    title="Call Driver"
                  >
                    ☎️
                  </button>
                  <button 
                    className="action-icon-btn"
                    onClick={(e) => handleViewRoute(e, truck.truckNo)}
                    title="View Route"
                  >
                    🗺️
                  </button>
                </div>
              </div>

              {/* Location Info */}
              <div className="location-info">
                <span className="location-label">📍 Current:</span>
                <span className="location-value">{truck.currentLocation}</span>
              </div>

              {/* Collection Status */}
              <div className="collection-status">
                {/* Collected */}
                <div className="status-group">
                  <div className="status-header">✅ Collected ({truck.collected.length})</div>
                  <div className="bins-list">
                    {truck.collected.map((bin, idx) => (
                      <span key={idx} className="bin-badge collected">{bin}</span>
                    ))}
                  </div>
                </div>

                {/* Pending */}
                <div className="status-group">
                  <div className="status-header">⏳ Pending ({truck.pending.length})</div>
                  <div className="bins-list">
                    {truck.pending.map((bin, idx) => (
                      <span key={idx} className="bin-badge pending">{bin}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="truck-footer">
                <div className="stat-item">
                  <span className="stat-label">Total Waste:</span>
                  <span className="stat-value">{truck.totalWaste} kg</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Fill Level Distribution</h3>
            <button className="chart-options" onClick={() => handleChartOptions('Fill Level Distribution')}>⋮</button>
          </div>
          <div className="chart-placeholder">
            <div className="placeholder-bar">
              <div className="bar" style={{ width: '35%', backgroundColor: '#10b981' }}></div>
            </div>
            <div className="placeholder-bar">
              <div className="bar" style={{ width: '55%', backgroundColor: '#f59e0b' }}></div>
            </div>
            <div className="placeholder-bar">
              <div className="bar" style={{ width: '15%', backgroundColor: '#ef4444' }}></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Daily Collections</h3>
            <button className="chart-options" onClick={() => handleChartOptions('Daily Collections')}>⋮</button>
          </div>
          <div className="chart-placeholder">
            <div className="mini-chart">
              <div className="mini-bar" style={{ height: '40%' }}></div>
              <div className="mini-bar" style={{ height: '65%' }}></div>
              <div className="mini-bar" style={{ height: '50%' }}></div>
              <div className="mini-bar" style={{ height: '75%' }}></div>
              <div className="mini-bar" style={{ height: '55%' }}></div>
              <div className="mini-bar" style={{ height: '80%' }}></div>
              <div className="mini-bar" style={{ height: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Recent Activity</h3>
          <a href="#view-all" onClick={handleViewAll} className="view-all-link">
            View All →
          </a>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Bin ID</th>
              <th>Location</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((activity) => (
              <tr key={activity.id}>
                <td className="bin-id">{activity.bin}</td>
                <td>{activity.location}</td>
                <td>
                  <span
                    className={`status-badge status-${activity.status.toLowerCase()}`}
                  >
                    {activity.status}
                  </span>
                </td>
                <td className="timestamp">{activity.timestamp}</td>
                <td>
                  <button className="action-btn" onClick={() => handleActionClick(activity.bin, activity.location)}>📍 View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
