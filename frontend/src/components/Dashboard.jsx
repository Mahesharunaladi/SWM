import React, { useState, useEffect } from 'react';
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
            onClick={() => setFilters('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filters === 'week' ? 'active' : ''}`}
            onClick={() => setFilters('week')}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${filters === 'month' ? 'active' : ''}`}
            onClick={() => setFilters('month')}
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

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Fill Level Distribution</h3>
            <button className="chart-options">⋮</button>
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
            <button className="chart-options">⋮</button>
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
          <a href="#view-all" className="view-all-link">
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
                  <button className="action-btn">📍 View</button>
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
