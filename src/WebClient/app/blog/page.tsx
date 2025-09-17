import Blog from '@dotcom/blog/blog';
import { getPosts } from '@dotcom/blog/content-utils';
import Post from '@dotcom/blog/post';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return <Blog posts={posts} />;
}
