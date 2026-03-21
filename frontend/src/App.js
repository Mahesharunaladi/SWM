import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-expanded' : ''}`}>
        <Navigation onToggleSidebar={toggleSidebar} />
        <Dashboard sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
}

export default App;
