import { formatDate, formatTitle, getLink } from './post-formatters';

describe('formatDate', () => {
  it('formats a Date object to a readable string', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const result = formatDate(date);
    expect(result).toContain('January');
    expect(result).toContain('15');
    expect(result).toContain('2026');
  });

  it('formats a date string to a readable string', () => {
    const result = formatDate('2025-06-01');
    expect(result).toContain('2025');
  });
});

describe('formatTitle', () => {
  it('returns title when no subtitle', () => {
    expect(formatTitle({ title: 'Hello World' })).toBe('Hello World');
  });

  it('returns title: subtitle when subtitle exists', () => {
    expect(formatTitle({ title: 'Hello', subtitle: 'World' })).toBe(
      'Hello: World',
    );
  });
});

describe('getLink', () => {
  it('returns the correct blog post path', () => {
    expect(getLink({ slug: 'my-post' })).toBe('/blog/posts/my-post');
  });
});
