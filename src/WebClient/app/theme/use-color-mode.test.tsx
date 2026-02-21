import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: jest.fn(),
  })),
}));

jest.mock('@/theme/init-color-mode', () => ({
  __esModule: true,
  default: () => 'light',
}));

jest.mock('@/theme/use-theme-media-query', () => ({
  __esModule: true,
  default: () => false,
}));

import { ColorModeContext } from './color-mode-provider';
import useColorMode from './use-color-mode';

describe('useColorMode', () => {
  it('returns the color mode context values', () => {
    const mockToggle = jest.fn();
    const mockChange = jest.fn();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ColorModeContext.Provider
        value={{
          colorMode: 'dark',
          isLight: false,
          isDark: true,
          onColorModeToggle: mockToggle,
          onColorModeChange: mockChange,
        }}
      >
        {children}
      </ColorModeContext.Provider>
    );

    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.colorMode).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);
    expect(result.current.onColorModeToggle).toBe(mockToggle);
    expect(result.current.onColorModeChange).toBe(mockChange);
  });
});
