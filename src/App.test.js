import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for extended matchers
import App from './App';

// Ensure cleanup after each test
afterEach(cleanup);

test('renders portfolio header', () => {
  render(<App />);
  
  // Find the header element and assert it is in the document
  const headerElement = screen.getByText(/Christopher's React Portfolio/i);
  expect(headerElement).toBeInTheDocument(); // Assert the element is in the DOM
});
