import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Victor Frye',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Victor Frye',
  },
};

interface PrivacyLayoutProps {
  children: ReactNode;
}

export default async function PrivacyLayout({
  children,
}: Readonly<PrivacyLayoutProps>) {
  return <>{children}</>;
}
