import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Blog from '../blog';
import type Post from '../post';

jest.mock('next/navigation', () => ({
  usePathname: () => '/blog',
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockPosts: Post[] = [
  {
    slug: 'test-post',
    title: 'Test Post',
    description: 'A test post description',
    date: new Date('2025-01-15'),
    image: '/assets/test.png',
    tags: ['react'],
    readingDuration: '3 min read',
  },
];

describe('Blog', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Blog posts={mockPosts} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders post descriptions', () => {
    renderWithProviders(<Blog posts={mockPosts} />);
    expect(screen.getByText('A test post description')).toBeInTheDocument();
  });
});
