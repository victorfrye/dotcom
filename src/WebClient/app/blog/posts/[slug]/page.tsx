import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPostBySlug, getPosts } from '@dotcom/lib/api';
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

  return (
    <main>
      <BlogPost post={post} />
    </main>
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
    title: `${post.title} | Victor Frye`,
    description: post.description,
    alternates: {
      canonical: `/blog/posts/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Victor Frye`,
      description: post.description,
      images: [`/${post.preview}`],
    },
  };
}
