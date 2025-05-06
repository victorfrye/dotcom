import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Victor Frye',
  description:
    'Hello from Grand Rapids! Welcome to the personal blog of your friendly neighborhood developer, Victor Frye.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Victor Frye',
    description:
      'The personal blog of your friendly neighborhood developer, Victor Frye.',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
