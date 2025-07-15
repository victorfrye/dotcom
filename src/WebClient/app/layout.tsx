import { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';

import Frame from '@dotcom/frame';
import '@dotcom/globals.css';
import ProviderTree from '@dotcom/provider-tree';

export const metadata: Metadata = {
  metadataBase: new URL('https://victorfrye.com'),
  title: 'Victor Frye | Your friendly neighborhood developer',
  description:
    'Hello from Grand Rapids! Welcome to the personal landing page of your friendly neighborhood developer, Victor Frye.',
  keywords: [
    'victor frye',
    'your friendly neighborhood developer',
    'grand rapids',
    'michigan',
    'developer',
    'software engineer',
    'consultant',
    'programmer',
    'technologist',
    'web',
    'cloud',
    'devops',
    'ai',
    'dotnet',
    'azure',
    'powershell',
  ],
  icons: ['/assets/profile.png'],
  authors: {
    name: 'Victor Frye',
    url: 'https://victorfrye.com/',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Victor Frye',
    description:
      'The personal landing page of your friendly neighborhood developer, Victor Frye.',
    siteName: 'VictorFrye.COM',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-WFNJTNS1NZ" />

      <body>
        <div id="root">
          <ProviderTree>{children}</ProviderTree>
        </div>
      </body>
    </html>
  );
}
