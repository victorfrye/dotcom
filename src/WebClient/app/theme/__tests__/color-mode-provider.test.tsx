import { screen } from '@testing-library/react';
import { useContext } from 'react';

import { renderWithProviders } from '../../../test-utils';
import ColorModeProvider, { ColorModeContext } from '../color-mode-provider';

jest.mock('@/storage', () => ({
  useLocalStorage: () => ({ value: null, handleValueChange: jest.fn() }),
}));

jest.mock('@/theme/init-color-mode', () => ({
  __esModule: true,
  default: () => 'light',
}));

jest.mock('@/theme/use-theme-media-query', () => ({
  __esModule: true,
  default: () => false,
}));

function TestConsumer() {
  const { colorMode, isLight, isDark } = useContext(ColorModeContext);
  return (
    <div>
      <span data-testid="colorMode">{colorMode}</span>
      <span data-testid="isLight">{String(isLight)}</span>
      <span data-testid="isDark">{String(isDark)}</span>
    </div>
  );
}

describe('ColorModeProvider', () => {
  it('renders children', () => {
    renderWithProviders(
      <ColorModeProvider>
        <div data-testid="child">Hello</div>
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides colorMode context', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toBeInTheDocument();
  });

  it('default colorMode is light when no stored preference', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');
  });

  it('isLight is true when colorMode is light', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('isLight')).toHaveTextContent('true');
  });

  it('isDark is false when colorMode is light', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('isDark')).toHaveTextContent('false');
  });
});
