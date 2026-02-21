import { act, renderHook } from '@testing-library/react';

import useThemeMediaQuery from './use-theme-media-query';

type MediaQueryListener = (event: MediaQueryListEvent) => void;

function createMockMatchMedia(matches: boolean) {
  const listeners: MediaQueryListener[] = [];

  const mql = {
    matches,
    addEventListener: (_event: string, listener: MediaQueryListener) => {
      listeners.push(listener);
    },
    removeEventListener: (_event: string, listener: MediaQueryListener) => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    },
  };

  const fireChange = (newMatches: boolean) => {
    for (const listener of listeners) {
      listener({ matches: newMatches } as MediaQueryListEvent);
    }
  };

  return { mql, fireChange };
}

describe('useThemeMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;
  const originalWindow = global.window;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    global.window = originalWindow;
  });

  it('returns false when system prefers light', () => {
    const { mql } = createMockMatchMedia(false);
    window.matchMedia = jest.fn().mockReturnValue(mql);

    const { result } = renderHook(() => useThemeMediaQuery());

    expect(result.current).toBe(false);
  });

  it('returns true when system prefers dark', () => {
    const { mql } = createMockMatchMedia(true);
    window.matchMedia = jest.fn().mockReturnValue(mql);

    const { result } = renderHook(() => useThemeMediaQuery());

    expect(result.current).toBe(true);
  });

  it('responds to media query changes', () => {
    const { mql, fireChange } = createMockMatchMedia(false);
    window.matchMedia = jest.fn().mockReturnValue(mql);

    const { result } = renderHook(() => useThemeMediaQuery());

    expect(result.current).toBe(false);

    act(() => {
      fireChange(true);
    });

    expect(result.current).toBe(true);
  });
});
