import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPostBySlug, getPostHtmlContent, getPosts } from '@dotcom/lib/api';
import BlogBreadcrumb from '@dotcom/lib/blog/BlogBreadcrumb';
import BlogPost from '@dotcom/lib/blog/BlogPost';

interface PostProps {
  slug: string;
}

interface PostParams {
  params: Promise<PostProps>;
}

export default async function Post(props: PostParams) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    throw notFound();
  }

  const html = await getPostHtmlContent(post.content);

  return (
    <>
      <BlogBreadcrumb post={post} />

      <BlogPost post={post} html={html} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: PostParams): Promise<Metadata> {
  const params = await props.params;

  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw notFound();
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: [post.preview],
    },
  };
}
