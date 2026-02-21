import Blog from '@/blog/blog';
import type Post from '@/blog/post';
import { getPosts } from '@/blog/post-loader';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return <Blog posts={posts} />;
}
