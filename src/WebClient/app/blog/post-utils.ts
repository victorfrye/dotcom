import Post from '@dotcom/blog/post';

export function formatDate(post: Post): string {
  return new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTitle(post: Post): string {
  return post.subtitle ? `${post.title}: ${post.subtitle}` : post.title;
}

export function getLink(post: Post): string {
  return `/blog/posts/${post.slug}`;
}
