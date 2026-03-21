import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Smart Waste Management with QR Code Tracking
            </h1>
            <p className="hero-subtitle">
              Simple QR code scanning on waste bins + Vehicle scanners = Complete collection tracking and real-time analytics
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={() => navigate('/login')}>
                Get Started
              </button>
              <button className="btn btn-outline btn-large" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Bins with QR Codes</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Active Trucks</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Collection Rate</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">📱♻️🚛</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Why Choose Our QR-Based System?</h2>
          <p>No IoT sensors needed - just QR codes and a vehicle scanner</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">�</div>
            <h3>QR Code Scanning</h3>
            <p>Every bin has a QR code. Driver scans it with the vehicle scanner or phone</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">�</div>
            <h3>Vehicle Scanner</h3>
            <p>Scanner mounted on the truck captures QR codes instantly during collection</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Live Analytics</h3>
            <p>Charts and compliance reports update in real-time after each scan</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Route Tracking</h3>
            <p>Live map shows all trucks moving in real-time with GPS integration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Instant Confirmation</h3>
            <p>Scan confirmation message appears instantly - no sensors, no delays</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>PDF Reports</h3>
            <p>Download compliance reports and collection history with one click</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="section-header">
          <h2>How It Works - 7 Simple Steps</h2>
          <p>QR Code Scanning Workflow for Efficient Waste Collection</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">🌐</div>
            <h3>Open the Web App</h3>
            <p>Login to dashboard with your admin credentials. See live stats instantly</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">🚛</div>
            <h3>Driver Starts Route</h3>
            <p>Go to Live Tracking page. Map shows all trucks moving in real-time (updates every 5 sec)</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">�</div>
            <h3>Truck Reaches Bin</h3>
            <p>Truck arrives at household/bin. Every bin has a QR code sticker on it</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">📱</div>
            <h3>Scan QR Code</h3>
            <p>Driver uses scanner mounted on vehicle (or phone camera). Instant success message appears</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">05</div>
            <div className="step-icon">✅</div>
            <h3>Collection Recorded</h3>
            <p>App instantly marks "collection done". Status changes to Green (Compliant). Waste amount can be entered</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">06</div>
            <div className="step-icon">🔄</div>
            <h3>Move to Next Bin</h3>
            <p>Map updates automatically. Driver sees next bin on route. Repeat scan process</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">07</div>
            <div className="step-icon">📊</div>
            <h3>Analytics Update Live</h3>
            <p>Go to Analytics page - charts refresh instantly. Compliance pie, trends, leaderboard all update. Click button → PDF downloads</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <h2>About Our Mission</h2>
            <p className="about-intro">
              We're revolutionizing waste management through simple, effective QR code tracking - no expensive IoT sensors needed.
            </p>
            <p>
              Our Smart Waste Management System uses QR codes on bins + vehicle scanners + web-based analytics to create an efficient, 
              sustainable waste collection ecosystem. No IoT sensors. No complex hardware. Just QR codes, scanners, and real-time data.
            </p>
            <p>
              Every household bin gets a QR code sticker. When the truck driver scans it during collection, our system instantly records 
              the collection, updates compliance status, and refreshes all analytics charts. One scan = complete data capture. 
              Perfect for any municipality, any scale, any budget.
            </p>
            <div className="about-values">
              <div className="value">
                <h4>💚 Simple & Affordable</h4>
                <p>QR codes cost almost nothing - no expensive IoT hardware</p>
              </div>
              <div className="value">
                <h4>⚡ Instant & Accurate</h4>
                <p>One scan = collection recorded instantly, compliance updated</p>
              </div>
              <div className="value">
                <h4>� Real-time Analytics</h4>
                <p>Charts, reports, and compliance data update live after each scan</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-visual">📱🚛✅</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Key Benefits of QR-Based System</h2>
          <p>Cost-effective waste collection with instant tracking</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-number">95%</div>
            <div className="benefit-title">Cost Savings</div>
            <p>No expensive IoT sensors - just QR codes and a scanner</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">1 sec</div>
            <div className="benefit-title">Instant Recording</div>
            <p>Collection recorded instantly when QR code is scanned</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">100%</div>
            <div className="benefit-title">Accuracy</div>
            <p>Every scan creates a permanent, tamper-proof record</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">Real-time</div>
            <div className="benefit-title">Analytics</div>
            <p>Charts and compliance reports update instantly after each scan</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Waste Management?</h2>
          <p>Join hundreds of cities optimizing their waste collection operations</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large">Start Free Trial</button>
            <button className="btn btn-secondary btn-large">Schedule Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SWM System</h4>
            <p>Smart Waste Management for a sustainable future</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#api">API Reference</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Smart Waste Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
