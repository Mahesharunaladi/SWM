import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar-top">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">♻️</span>
          <span className="brand-text">SWM</span>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#blog" className="nav-link">Blog</a>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                AD
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <a href="#dashboard">Dashboard</a>
                  <a href="#settings">Settings</a>
                  <a href="#logout">Logout</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="#login" className="nav-link" onClick={() => navigate('/login')}>Login</a>
              <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
