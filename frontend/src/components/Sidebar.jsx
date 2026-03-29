import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/dashboard',
    },
    {
      id: 'scanner',
      label: 'QR Scanner',
      icon: '�',
      href: '/scanner',
    },
    {
      id: 'tracking',
      label: 'Live Tracking',
      icon: '�️',
      href: '/tracking',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      href: '/analytics',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📄',
      href: '/reports',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/settings',
    },
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">♻️</div>
        <div className="sidebar-brand">
          <span className="brand-name">SWM</span>
          <span className="brand-subtitle">System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.id}>
                <button
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveMenu(item.id);
                    navigate(item.href);
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-info">
          <div className="info-text">
            <p className="info-label">v1.0.0</p>
            <p className="info-desc">Smart Waste Management</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
