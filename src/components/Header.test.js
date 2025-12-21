import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure jest-dom matchers are imported
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import Header from './Header';

afterEach(() => cleanup());

test('renders portfolio header', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Header />
    </ThemeProvider>
  );
  const headerElement = screen.getByText(/Christopher Bray's Portfolio/i);
});

test('toggles theme between light and dark mode', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Header />
    </ThemeProvider>
  );

  const themeToggleButton = screen.getByRole('button', { name: /Day Mode/i });
  expect(themeToggleButton).toBeInTheDocument();

  fireEvent.click(themeToggleButton);
  expect(themeToggleButton).toHaveTextContent('Night Mode');
});
