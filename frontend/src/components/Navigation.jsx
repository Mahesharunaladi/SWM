import React, { useState } from 'react';
import '../styles/Navigation.css';

const Navigation = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, message: 'Bin #12 is 90% full', time: '5 mins ago', read: false },
    { id: 2, message: 'Route optimization completed', time: '30 mins ago', read: true },
    { id: 3, message: 'New report available', time: '2 hours ago', read: true },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="navbar-title">Smart Waste Management</h1>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search bins, routes..."
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Notifications */}
        <div className="navbar-icon-group">
          <button
            className="navbar-icon notification-btn"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            🔔
            {notifications.some((n) => !n.read) && (
              <span className="notification-badge">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="notification-dropdown">
              <div className="dropdown-header">Notifications</div>
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <p className="notif-message">{notif.message}</p>
                    <p className="notif-time">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <a href="#notifications">View all notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <p className="user-name">Admin</p>
            <p className="user-role">Administrator</p>
          </div>
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ▼
          </button>

          {dropdownOpen && (
            <div className="user-dropdown">
              <a href="#profile" className="dropdown-item">
                👤 Profile
              </a>
              <a href="#settings" className="dropdown-item">
                ⚙️ Settings
              </a>
              <a href="#help" className="dropdown-item">
                ❓ Help & Support
              </a>
              <div className="dropdown-divider"></div>
              <a href="#logout" className="dropdown-item logout">
                🚪 Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
