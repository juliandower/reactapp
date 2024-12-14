import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders portfolio sections', () => {
  const { getByText } = render(<App />);
  
  // Check if main sections are rendered
  expect(getByText(/about me/i)).toBeInTheDocument();
  expect(getByText(/my projects/i)).toBeInTheDocument();
  expect(getByText(/skills/i)).toBeInTheDocument();
  expect(getByText(/contact me/i)).toBeInTheDocument();
});
