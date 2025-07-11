import { ReactNode } from 'react';

import { Metadata } from 'next';

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

export default function PrivacyLayout({
  children,
}: Readonly<PrivacyLayoutProps>) {
  return <>{children}</>;
}
