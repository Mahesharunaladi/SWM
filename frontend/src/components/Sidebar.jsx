import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/',
    },
    {
      id: 'bins',
      label: 'Smart Bins',
      icon: '🗑️',
      href: '/bins',
    },
    {
      id: 'routes',
      label: 'Collection Routes',
      icon: '🛣️',
      href: '/routes',
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
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`sidebar-link ${activeMenu === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.id);
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </a>
            </li>
          ))}
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
