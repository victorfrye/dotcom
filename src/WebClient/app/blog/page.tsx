import Blog from '@/blog/blog';
import { getPosts } from '@/blog/content-utils';
import type Post from '@/blog/post';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return <Blog posts={posts} />;
}
