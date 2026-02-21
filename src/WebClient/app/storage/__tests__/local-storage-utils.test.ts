import { readValue, writeValue } from '../local-storage-utils';

describe('readValue', () => {
  beforeEach(() => {
    localStorage.clear();
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
});

describe('writeValue', () => {
  beforeEach(() => {
    localStorage.clear();
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
});
