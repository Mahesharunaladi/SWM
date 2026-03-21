import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import QRScanner from './pages/QRScanner';
import LiveTracking from './pages/LiveTracking';
import Analytics from './pages/Analytics';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  // If logged in, show dashboard even on home route
  if (isLoggedIn) {
    return (
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className={`main-content ${sidebarOpen ? 'sidebar-expanded' : ''}`}>
          <Navigation onToggleSidebar={toggleSidebar} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Dashboard sidebarOpen={sidebarOpen} />} />
            <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} />} />
            <Route path="/scanner" element={<QRScanner />} />
            <Route path="/tracking" element={<LiveTracking />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Dashboard sidebarOpen={sidebarOpen} />} />
          </Routes>
        </div>
      </div>
    );
  }

  // If not logged in and trying to access dashboard pages (except home and login), redirect to login
  if (!isLoginPage && !isHomePage) {
    return <Navigate to="/" />;
  }

  // Show home page when not logged in
  if (isHomePage) {
    return (
      <div className="home-layout">
        <Navbar isLoggedIn={false} />
        <Home />
      </div>
    );
  }

  // Show login page
  if (isLoginPage) {
    return <Login />;
  }
};

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
