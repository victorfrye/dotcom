import { getPosts } from '@dotcom/lib/api';
import { Blog } from '@dotcom/lib/blog';
import { Post } from '@dotcom/types';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return <Blog posts={posts} />;
}
