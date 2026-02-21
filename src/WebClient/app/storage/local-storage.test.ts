import { act, renderHook } from '@testing-library/react';

import useLocalStorage, { readValue, writeValue } from './local-storage';

describe('readValue', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it('returns null when key does not exist', () => {
    expect(readValue('nonexistent')).toBeNull();
  });

  it('reads a stored value', () => {
    localStorage.setItem('test-key', JSON.stringify({ a: 1 }));
    expect(readValue('test-key')).toEqual({ a: 1 });
  });

  it('returns null for invalid JSON', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('bad-json', '{invalid}');
    expect(readValue('bad-json')).toBeNull();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('returns null when window is undefined (SSR)', () => {
    // @ts-expect-error - simulating SSR
    delete global.window;

    expect(readValue('test-key')).toBeNull();
  });
});

describe('writeValue', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it('writes a value to localStorage', () => {
    writeValue('test-key', { b: 2 });
    expect(localStorage.getItem('test-key')).toBe('{"b":2}');
  });

  it('overwrites existing values', () => {
    writeValue('test-key', 'first');
    writeValue('test-key', 'second');
    const stored = localStorage.getItem('test-key');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).toBe('second');
  });

  it('handles error when localStorage.setItem throws', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

    writeValue('test-key', { data: 'value' });

    expect(spy).toHaveBeenCalledWith(
      'Error setting localStorage key:',
      'test-key',
      expect.any(Error),
    );
    spy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('does nothing when window is undefined (SSR)', () => {
    // @ts-expect-error - simulating SSR
    delete global.window;

    // Should not throw error
    expect(() => writeValue('test-key', 'test-value')).not.toThrow();
  });
});

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
