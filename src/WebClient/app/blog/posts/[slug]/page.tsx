import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import Article from '@/blog/article';
import { getPostBySlug, getPosts } from '@/blog/content-utils';
import { getLink } from '@/blog/post-utils';

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

  return <Article post={post} />;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PostPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    throw notFound();
  }

  const previousKeywords = (await parent).keywords ?? [];

  return {
    title: `${post.title} | Victor Frye`,
    description: post.description,
    keywords: [...previousKeywords, ...post.tags],
    alternates: {
      canonical: getLink(post),
    },
    openGraph: {
      title: `${post.title} | Victor Frye`,
      description: post.description,
      images: [`/${post.image}`],
    },
  };
}
