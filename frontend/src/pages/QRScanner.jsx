import React, { useState, useRef, useEffect } from 'react';
import '../styles/QRScanner.css';

const QRScanner = () => {
  const [scannedData, setScannedData] = useState([]);
  const [manualQRCode, setManualQRCode] = useState('');
  const [scanMessage, setScanMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    truckId: 'TRUCK-001',
    driver: 'John Doe',
    totalBins: 25,
    scannedBins: 0,
    remainingBins: 25,
  });

  // Mock data for bins
  const mockBins = {
    'QR-001': { id: 'BIN-001', location: 'Main Street #42', household: 'Smith Residence', waste: 0 },
    'QR-002': { id: 'BIN-002', location: 'Park Avenue #15', household: 'Johnson Home', waste: 0 },
    'QR-003': { id: 'BIN-003', location: 'Downtown Center', household: 'City Office', waste: 0 },
    'QR-004': { id: 'BIN-004', location: 'Shopping Mall', household: 'Mall Management', waste: 0 },
    'QR-005': { id: 'BIN-005', location: 'Hospital Area', household: 'Medical Center', waste: 0 },
  };

  const handleManualScan = () => {
    if (!manualQRCode.trim()) {
      setScanMessage('⚠️ Please enter a QR code');
      setShowSuccess(false);
      return;
    }

    const binData = mockBins[manualQRCode];
    if (!binData) {
      setScanMessage('❌ Invalid QR Code - Bin not found');
      setShowSuccess(false);
      setManualQRCode('');
      return;
    }

    // Check if already scanned
    if (scannedData.find(scan => scan.qrCode === manualQRCode)) {
      setScanMessage('⚠️ This bin was already scanned in this route');
      setShowSuccess(false);
      setManualQRCode('');
      return;
    }

    // Successful scan
    const newScan = {
      qrCode: manualQRCode,
      binId: binData.id,
      location: binData.location,
      household: binData.household,
      timestamp: new Date().toLocaleTimeString(),
      wasteAmount: 0,
      status: 'collected',
    };

    setScannedData([...scannedData, newScan]);
    setCurrentRoute({
      ...currentRoute,
      scannedBins: currentRoute.scannedBins + 1,
      remainingBins: currentRoute.remainingBins - 1,
    });

    setScanMessage(`✅ Successfully scanned: ${binData.household}`);
    setShowSuccess(true);
    setManualQRCode('');

    // Clear message after 3 seconds
    setTimeout(() => setScanMessage(''), 3000);
  };

  const handleWasteInput = (index, amount) => {
    const updatedScans = [...scannedData];
    updatedScans[index].wasteAmount = parseFloat(amount) || 0;
    setScannedData(updatedScans);
  };

  const handleEndRoute = () => {
    if (currentRoute.scannedBins === 0) {
      alert('Please scan at least one bin before ending route');
      return;
    }
    alert(`Route completed! Total scans: ${currentRoute.scannedBins}`);
    // In real app, this would save to backend
    setScannedData([]);
    setCurrentRoute({
      ...currentRoute,
      scannedBins: 0,
      remainingBins: currentRoute.totalBins,
    });
  };

  return (
    <div className="qr-scanner-page">
      <div className="scanner-container">
        {/* Route Information */}
        <div className="route-info-card">
          <h3>🚚 Active Route Information</h3>
          <div className="route-details">
            <div className="detail-item">
              <span className="label">Truck ID:</span>
              <span className="value">{currentRoute.truckId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Driver:</span>
              <span className="value">{currentRoute.driver}</span>
            </div>
            <div className="detail-item">
              <span className="label">Total Bins:</span>
              <span className="value">{currentRoute.totalBins}</span>
            </div>
            <div className="detail-item">
              <span className="label">Scanned:</span>
              <span className="value scanned">{currentRoute.scannedBins}</span>
            </div>
            <div className="detail-item">
              <span className="label">Remaining:</span>
              <span className="value remaining">{currentRoute.remainingBins}</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentRoute.scannedBins / currentRoute.totalBins) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {Math.round((currentRoute.scannedBins / currentRoute.totalBins) * 100)}% Complete
          </p>
        </div>

        {/* QR Code Scanner Section */}
        <div className="scanner-section">
          <h2>📱 QR Code Scanner</h2>
          <p className="scanner-description">
            Scan the QR code on the bin using the vehicle's scanner or phone camera
          </p>

          <div className="scan-input-group">
            <input
              type="text"
              value={manualQRCode}
              onChange={(e) => setManualQRCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
              placeholder="Enter QR Code (e.g., QR-001) or use scanner..."
              className="qr-input"
              autoFocus
            />
            <button onClick={handleManualScan} className="btn btn-primary scan-btn">
              Scan
            </button>
          </div>

          {scanMessage && (
            <div className={`scan-message ${showSuccess ? 'success' : 'error'}`}>
              {scanMessage}
            </div>
          )}
        </div>

        {/* Scanned Collection History */}
        <div className="scanned-history">
          <h2>✅ Collection History (This Route)</h2>
          {scannedData.length === 0 ? (
            <p className="empty-state">No bins scanned yet. Start scanning to begin collection.</p>
          ) : (
            <div className="scans-list">
              {scannedData.map((scan, index) => (
                <div key={index} className="scan-card">
                  <div className="scan-header">
                    <span className="bin-id">{scan.binId}</span>
                    <span className="scan-time">{scan.timestamp}</span>
                  </div>
                  <div className="scan-details">
                    <p className="household"><strong>📍 Location:</strong> {scan.location}</p>
                    <p className="household"><strong>🏠 Household:</strong> {scan.household}</p>
                  </div>
                  <div className="waste-input">
                    <label>Waste Amount (kg):</label>
                    <input
                      type="number"
                      value={scan.wasteAmount}
                      onChange={(e) => handleWasteInput(index, e.target.value)}
                      placeholder="Optional"
                      min="0"
                    />
                  </div>
                  <div className="scan-status">
                    <span className="status-badge collected">✓ Collected</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={() => setScannedData([])}>
            Clear History
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleEndRoute}
            disabled={scannedData.length === 0}
          >
            End Route & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
