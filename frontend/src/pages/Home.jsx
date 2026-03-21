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
              Smart Waste Management System
            </h1>
            <p className="hero-subtitle">
              Revolutionizing waste collection with IoT-enabled smart bins and intelligent routing algorithms
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
                <p>Active Bins</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Cities</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Efficiency</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">🌍♻️</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our System?</h2>
          <p>Cutting-edge technology for efficient waste management</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📡</div>
            <h3>IoT Integration</h3>
            <p>Real-time monitoring of bin fill levels using advanced sensors and cloud connectivity</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Smart Routing</h3>
            <p>AI-powered route optimization reduces collection time by 40% and fuel consumption</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive insights and real-time analytics for better decision making</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">♻️</div>
            <h3>Sustainability</h3>
            <p>Reduce carbon footprint and contribute to a greener environment</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Data Security</h3>
            <p>Enterprise-grade security with end-to-end encryption and compliance certifications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Instant notifications and live tracking for all waste collection activities</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple, efficient, and intelligent waste management</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">🗑️</div>
            <h3>Smart Bins Deployment</h3>
            <p>Deploy IoT-enabled bins across your city with GPS tracking and fill-level sensors</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">📡</div>
            <h3>Real-time Monitoring</h3>
            <p>Monitor fill levels in real-time through our cloud-based dashboard</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">🤖</div>
            <h3>AI Route Optimization</h3>
            <p>Algorithm generates optimal collection routes based on current data</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">📊</div>
            <h3>Analytics & Reports</h3>
            <p>Get detailed insights and reports for continuous improvement</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About Our Mission</h2>
            <p className="about-intro">
              We're committed to transforming waste management through innovation and technology.
            </p>
            <p>
              Our Smart Waste Management System combines IoT sensors, artificial intelligence, and cloud computing 
              to create an efficient, sustainable waste collection ecosystem. We help cities and municipalities 
              reduce operational costs by up to 40% while minimizing environmental impact.
            </p>
            <p>
              With over a decade of experience in waste management and smart city solutions, our team has developed 
              a platform trusted by hundreds of municipalities worldwide. We believe that intelligent waste management 
              is key to building sustainable cities for future generations.
            </p>
            <div className="about-values">
              <div className="value">
                <h4>💚 Sustainability</h4>
                <p>Reducing carbon footprint and environmental impact</p>
              </div>
              <div className="value">
                <h4>🚀 Innovation</h4>
                <p>Cutting-edge technology and continuous improvement</p>
              </div>
              <div className="value">
                <h4>👥 Community</h4>
                <p>Building cleaner, healthier communities worldwide</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-visual">🌱🏙️</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Key Benefits</h2>
          <p>Transform your waste management operations</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-number">40%</div>
            <div className="benefit-title">Cost Reduction</div>
            <p>Reduce operational expenses through optimized routing</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">50%</div>
            <div className="benefit-title">Time Savings</div>
            <p>Faster collection with AI-powered optimization</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">35%</div>
            <div className="benefit-title">Carbon Reduction</div>
            <p>Lower emissions with efficient route planning</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">99.9%</div>
            <div className="benefit-title">Uptime</div>
            <p>Enterprise-grade reliability and redundancy</p>
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
