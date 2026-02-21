import { readValue } from '@/storage';
import initColorMode from '../init-color-mode';

jest.mock('@/storage', () => ({
  readValue: jest.fn(),
}));

const mockReadValue = readValue as jest.Mock;

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockReturnValue({ matches }),
  });
}

describe('initColorMode', () => {
  beforeEach(() => {
    mockReadValue.mockReset();
  });

  it('returns light when no stored preference and system prefers light', () => {
    mockReadValue.mockReturnValue(null);
    mockMatchMedia(false);
    expect(initColorMode()).toBe('light');
  });

  it('returns dark when no stored preference and system prefers dark', () => {
    mockReadValue.mockReturnValue(null);
    mockMatchMedia(true);
    expect(initColorMode()).toBe('dark');
  });

  it('returns stored colorMode when preference is light', () => {
    mockReadValue.mockReturnValue({ colorMode: 'light' });
    mockMatchMedia(true);
    expect(initColorMode()).toBe('light');
  });

  it('returns stored colorMode when preference is dark', () => {
    mockReadValue.mockReturnValue({ colorMode: 'dark' });
    mockMatchMedia(false);
    expect(initColorMode()).toBe('dark');
  });
});
