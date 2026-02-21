import type { Metadata } from 'next';

import Article from '@/blog/article';
import { getMdxReadingDuration } from '@/blog/content-utils';
import Content, { frontmatter } from './content.mdx';

const readingDuration = getMdxReadingDuration('microsoft-build-2025-wrapped');

export const metadata: Metadata = {
  title: `${frontmatter.title} | Victor Frye`,
  description: frontmatter.description,
  keywords: frontmatter.tags,
  alternates: { canonical: `/blog/posts/${frontmatter.slug}` },
  openGraph: {
    title: `${frontmatter.title} | Victor Frye`,
    description: frontmatter.description,
    images: [`/${frontmatter.image}`],
  },
};

export default function PostPage() {
  return (
    <Article
      post={{
        ...frontmatter,
        readingDuration,
      }}
    >
      <Content />
    </Article>
  );
}
