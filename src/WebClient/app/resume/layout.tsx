import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Resume | Victor Frye',
  description:
    'Hello from Grand Rapids! Welcome to the digital resume of your friendly neighborhood developer, Victor Frye.',
  keywords: ['victor frye', 'your friendly neighborhood developer', 'resume'],
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume | Victor Frye',
    description:
      'The digital resume of your friendly neighborhood developer, Victor Frye.',
  },
};

interface ResumeLayoutProps {
  children: ReactNode;
}

export default async function ResumeLayout({
  children,
}: Readonly<ResumeLayoutProps>) {
  return <>{children}</>;
}
