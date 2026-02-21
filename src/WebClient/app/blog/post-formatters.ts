import type Post from '@/blog/post';

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTitle(post: Pick<Post, 'title' | 'subtitle'>): string {
  return post.subtitle ? `${post.title}: ${post.subtitle}` : post.title;
}

export function getLink(post: Pick<Post, 'slug'>): string {
  return `/blog/posts/${post.slug}`;
}
