import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials (4 IDs for municipal staff)
  const adminCredentials = [
    { email: 'admin@swm.com', password: 'admin123', name: 'Admin' },
    { email: 'supervisor@swm.com', password: 'super123', name: 'Supervisor' },
    { email: 'manager@swm.com', password: 'manager123', name: 'Manager' },
    { email: 'coordinator@swm.com', password: 'coord123', name: 'Coordinator' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check credentials against admin list
    const admin = adminCredentials.find(
      (cred) => cred.email === formData.email && cred.password === formData.password
    );

    if (!admin) {
      setError('Invalid email or password. Please check your credentials.');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store login info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', admin.email);
      localStorage.setItem('userName', admin.name);

      // Redirect to dashboard
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    // Use first admin account for demo
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'admin@swm.com');
    localStorage.setItem('userName', 'Admin');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Brand */}
        <div className="login-brand-section">
          <div className="brand-logo">♻️</div>
          <h1 className="brand-name">SWM</h1>
          <p className="brand-tagline">Smart Waste Management</p>
          <p className="brand-description">
            Efficient waste collection with QR code tracking and real-time analytics
          </p>
          <div className="brand-features">
            <div className="feature">
              <span>✅</span>
              <p>Real-time QR scanning</p>
            </div>
            <div className="feature">
              <span>✅</span>
              <p>Live truck tracking</p>
            </div>
            <div className="feature">
              <span>✅</span>
              <p>Compliance analytics</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Municipal Admin Portal</p>

            {/* Admin Credentials Info */}
            <div className="admin-credentials-info">
              <p className="info-title">📋 Valid Credentials:</p>
              <ul className="credentials-list">
                <li><strong>admin@swm.com</strong> / admin123</li>
                <li><strong>supervisor@swm.com</strong> / super123</li>
                <li><strong>manager@swm.com</strong> / manager123</li>
                <li><strong>coordinator@swm.com</strong> / coord123</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#forgot-password" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-login"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="divider">
              <span>Or</span>
            </div>

            <button
              className="btn btn-secondary btn-demo"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              🎯 Try Demo Login
            </button>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <a href="#signup" className="signup-link">
                  Sign up here
                </a>
              </p>
            </div>

            <div className="login-security">
              <p>🔒 Your data is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
