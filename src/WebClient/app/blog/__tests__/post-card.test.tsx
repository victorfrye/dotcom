import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import type Post from '../post';
import PostCard from '../post-card';

const mockPost: Post = {
  slug: 'test-post',
  title: 'Test Post',
  description: 'A test description',
  date: new Date('2025-06-01T12:00:00'),
  image: 'assets/test.png',
  tags: ['react', 'next'],
  readingDuration: '3 min read',
};

describe('PostCard', () => {
  it('renders post title using formatTitle', () => {
    renderWithProviders(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders post description', () => {
    renderWithProviders(<PostCard post={mockPost} />);
    expect(screen.getByText('A test description')).toBeInTheDocument();
  });

  it('renders Read article button with link to post', () => {
    renderWithProviders(<PostCard post={mockPost} />);
    const button = screen.getByRole('link', { name: /Read article/i });
    expect(button).toHaveAttribute('href', '/blog/posts/test-post');
  });

  it('renders tags sorted alphabetically', () => {
    renderWithProviders(<PostCard post={mockPost} />);
    const tags = screen.getAllByText(/^(next|react)$/);
    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent('next');
    expect(tags[1]).toHaveTextContent('react');
  });

  it('renders formatted date and reading duration', () => {
    renderWithProviders(<PostCard post={mockPost} />);
    expect(screen.getByText(/June/)).toBeInTheDocument();
    expect(screen.getByText(/3 min read/)).toBeInTheDocument();
  });
});
