import { act, renderHook } from '@testing-library/react';

import useLocalStorage from '../use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage<string>('test-key'));

    expect(result.current.value).toBeNull();
  });

  it('returns stored value from localStorage when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage<string>('test-key'));

    expect(result.current.value).toBe('stored-value');
  });

  it('handleValueChange updates state and writes to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>('test-key'));

    act(() => {
      result.current.handleValueChange('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('uses custom initial value when provided', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('test-key', 'default'),
    );

    expect(result.current.value).toBe('default');
  });
});
