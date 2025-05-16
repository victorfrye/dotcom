import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogPost from '@dotcom/blog/blog-post';
import { getPostBySlug, getPosts } from '@dotcom/blog/posts-api';

interface PostPageProps {
  slug: string;
}

interface PostPageParams {
  params: Promise<PostPageProps>;
}

export default async function PostPage({ params }: Readonly<PostPageParams>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    throw notFound();
  }

  return <BlogPost post={post} />;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

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
