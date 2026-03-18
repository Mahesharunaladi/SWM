import React from 'react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = require('@testing-library/react').render(<App />);
    expect(getByText(/Smart Waste Management System/i)).toBeInTheDocument();
  });
});
