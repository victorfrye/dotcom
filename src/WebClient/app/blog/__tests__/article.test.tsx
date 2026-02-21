import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Article, { type ArticlePost } from '../article';

const mockPost: ArticlePost = {
  title: 'Test Post',
  subtitle: 'A Subtitle',
  date: new Date('2025-01-15'),
  readingDuration: '5 min read',
  image: 'assets/test.png',
  tags: ['react', 'azure', 'dotnet'],
  slug: 'test-post',
};

describe('Article', () => {
  it('renders post title', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Content</p>
      </Article>,
    );
    expect(screen.getByText('Test Post: A Subtitle')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Child content here</p>
      </Article>,
    );
    expect(screen.getByText('Child content here')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Content</p>
      </Article>,
    );
    expect(screen.getByText(/January/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('renders reading duration', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Content</p>
      </Article>,
    );
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it('renders tags sorted alphabetically', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Content</p>
      </Article>,
    );
    const tags = screen.getAllByText(/^(azure|dotnet|react)$/);
    expect(tags).toHaveLength(3);
    expect(tags[0]).toHaveTextContent('azure');
    expect(tags[1]).toHaveTextContent('dotnet');
    expect(tags[2]).toHaveTextContent('react');
  });

  it('renders image with alt text', () => {
    renderWithProviders(
      <Article post={mockPost}>
        <p>Content</p>
      </Article>,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test Post');
  });
});
