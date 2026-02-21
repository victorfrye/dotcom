import { render, screen } from '@testing-library/react';

import ThemeProvider from './theme-provider';

const mockUseColorMode = jest.fn(() => ({
  colorMode: 'light',
  isLight: true,
  isDark: false,
  onColorModeToggle: jest.fn(),
  onColorModeChange: jest.fn(),
}));

jest.mock('@/theme/use-color-mode', () => ({
  __esModule: true,
  default: () => mockUseColorMode(),
}));

describe('ThemeProvider', () => {
  beforeEach(() => {
    mockUseColorMode.mockReturnValue({
      colorMode: 'light',
      isLight: true,
      isDark: false,
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });
  });

  it('renders children', () => {
    render(
      <ThemeProvider>
        <p>Themed content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('Themed content')).toBeInTheDocument();
  });

  it('uses webDarkTheme when isDark is true', () => {
    mockUseColorMode.mockReturnValue({
      colorMode: 'dark',
      isLight: false,
      isDark: true,
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });

    render(
      <ThemeProvider>
        <p>Dark themed content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('Dark themed content')).toBeInTheDocument();
  });

  it('uses webLightTheme when isDark is false', () => {
    mockUseColorMode.mockReturnValue({
      colorMode: 'light',
      isLight: true,
      isDark: false,
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });

    render(
      <ThemeProvider>
        <p>Light themed content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('Light themed content')).toBeInTheDocument();
  });
});
