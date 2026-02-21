import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

jest.mock('@microsoft/clarity', () => ({
  init: jest.fn(),
  consent: jest.fn(),
}));

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: jest.fn(),
  })),
}));

import { ConsentContext } from '../consent-provider';
import useConsent from '../use-consent';

describe('useConsent', () => {
  it('returns the consent context values', () => {
    const mockOnChange = jest.fn();
    const mockConsent = { analytics: true, advertising: false };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ConsentContext.Provider
        value={{
          consent: mockConsent,
          onConsentChange: mockOnChange,
        }}
      >
        {children}
      </ConsentContext.Provider>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    expect(result.current.consent).toEqual(mockConsent);
    expect(result.current.onConsentChange).toBe(mockOnChange);
  });
});
