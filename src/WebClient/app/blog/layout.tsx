import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Victor Frye',
  description:
    'Hello from Grand Rapids! Welcome to the personal blog of your friendly neighborhood developer, Victor Frye.',
  keywords: ['victor frye', 'your friendly neighborhood developer', 'blog'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Victor Frye',
    description:
      'The personal blog of your friendly neighborhood developer, Victor Frye.',
  },
};

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: Readonly<BlogLayoutProps>) {
  return <>{children}</>;
}
