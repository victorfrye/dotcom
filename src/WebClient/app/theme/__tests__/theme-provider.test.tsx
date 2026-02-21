import { render, screen } from '@testing-library/react';

import ThemeProvider from '../theme-provider';

jest.mock('@/theme/use-color-mode', () => ({
  __esModule: true,
  default: () => ({
    colorMode: 'light',
    isLight: true,
    isDark: false,
    onColorModeToggle: jest.fn(),
    onColorModeChange: jest.fn(),
  }),
}));

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <p>Themed content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('Themed content')).toBeInTheDocument();
  });
});
