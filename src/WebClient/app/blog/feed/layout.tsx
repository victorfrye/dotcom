import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Feed | Victor Frye',
  description:
    'The blog syndication feed of your friendly neighborhood developer, Victor Frye.',
  keywords: [
    'victor frye',
    'your friendly neighborhood developer',
    'blog',
    'feed',
    'rss',
  ],
  alternates: {
    canonical: '/blog/feed',
  },
  openGraph: {
    title: 'Blog Feed | Victor Frye',
    description:
      'The blog syndication feed of your friendly neighborhood developer, Victor Frye.',
  },
};

interface FeedLayoutProps {
  children: React.ReactNode;
}

export default async function FeedLayout({
  children,
}: Readonly<FeedLayoutProps>) {
  return <>{children}</>;
}
