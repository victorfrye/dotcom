import Blog from '@dotcom/blog/blog';
import { getPosts } from '@dotcom/blog/posts-api';
import { Post } from '@dotcom/types';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return <Blog posts={posts} />;
}
