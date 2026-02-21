import { act, renderHook } from '@testing-library/react';

import useCookieBanner from './use-cookie-banner';

const mockOnConsentChange = jest.fn();

jest.mock('@/privacy/use-consent', () => ({
  __esModule: true,
  default: () => ({ consent: null, onConsentChange: mockOnConsentChange }),
}));

describe('useCookieBanner', () => {
  beforeEach(() => {
    mockOnConsentChange.mockClear();
  });

  it('initial state has consentDialogOpen true when consent is null', () => {
    const { result } = renderHook(() => useCookieBanner());

    expect(result.current.consentDialogOpen).toBe(true);
  });

  it('handleAcceptClick sets analytics and advertising to true', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAcceptClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalledWith({
      analytics: true,
      advertising: true,
    });
  });

  it('handleRejectClick sets analytics and advertising to false', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleRejectClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalledWith({
      analytics: false,
      advertising: false,
    });
  });

  it('handleManageClick opens manager dialog', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleManageClick();
    });

    expect(result.current.managerDialogOpen).toBe(true);
    expect(result.current.consentDialogOpen).toBe(false);
  });

  it('handleSaveClick saves current toggle states', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleSaveClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalledWith({
      analytics: true,
      advertising: true,
    });
  });

  it('handleFabClick opens manager dialog', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleFabClick();
    });

    expect(result.current.managerDialogOpen).toBe(true);
  });

  it('handleAnalyticsToggle sets analytics to true', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAnalyticsToggle(
        {} as React.ChangeEvent<HTMLInputElement>,
        { checked: true },
      );
    });

    expect(result.current.analyticsEnabled).toBe(true);
  });

  it('handleAnalyticsToggle sets analytics to false', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAnalyticsToggle(
        {} as React.ChangeEvent<HTMLInputElement>,
        { checked: false },
      );
    });

    expect(result.current.analyticsEnabled).toBe(false);
  });

  it('handleAdvertisingToggle sets advertising to true', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAdvertisingToggle(
        {} as React.ChangeEvent<HTMLInputElement>,
        { checked: true },
      );
    });

    expect(result.current.advertisingEnabled).toBe(true);
  });

  it('handleAdvertisingToggle sets advertising to false', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAdvertisingToggle(
        {} as React.ChangeEvent<HTMLInputElement>,
        { checked: false },
      );
    });

    expect(result.current.advertisingEnabled).toBe(false);
  });
});
