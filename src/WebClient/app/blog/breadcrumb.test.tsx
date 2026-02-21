import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';
import type { ArticlePost } from './article';
import BlogBreadcrumb from './breadcrumb';

const mockPost: ArticlePost = {
  title: 'Test Post',
  date: new Date('2025-01-15'),
  readingDuration: '5 min read',
  image: 'assets/test.png',
  tags: ['react'],
  slug: 'test-post',
};

describe('BlogBreadcrumb', () => {
  it('renders Home breadcrumb link when no post', () => {
    renderWithProviders(<BlogBreadcrumb />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders post title in breadcrumb when post provided', () => {
    renderWithProviders(<BlogBreadcrumb post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });

  it('Home link points to /blog', () => {
    renderWithProviders(<BlogBreadcrumb post={mockPost} />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((link) => link.textContent?.includes('Home'));
    expect(homeLink).toBeDefined();
    expect(homeLink).toHaveAttribute('href', '/blog');
  });
});
