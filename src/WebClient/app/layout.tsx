import { ReactNode } from 'react';

import '@wooorm/starry-night/style/both';
import { Metadata } from 'next';

import '@dotcom/app/globals.css';
import { Profile } from '@dotcom/lib/layout';
import { DarkModeProvider, ThemeProvider } from '@dotcom/lib/theme';

export const metadata: Metadata = {
  metadataBase: new URL('https://victorfrye.com'),
  title: 'Victor Frye | Your friendly neighborhood developer',
  description:
    "Hello from Grand Rapids! I'm Victor Frye, your friendly neighborhood developer, and this is my personal landing page.",
  keywords: [
    'victor',
    'frye',
    'victor frye',
    'grand rapids',
    'gr',
    'michigan',
    'mi',
    'developer',
    'dev',
    'engineer',
    'software engineer',
    'swe',
    'consultant',
    'programmer',
    'technologist',
    'technology',
    'software',
    'web',
    'cloud',
    'artificial intelligence',
    'ai',
    'full stack',
    'typescript',
    'ts',
    'javascript',
    'js',
    'react',
    'node',
    'next',
    'css',
    'html',
    '.net',
    'dotnet',
    'c#',
    'csharp',
    'azure',
    'powershell',
    'pwsh',
    'sql',
    'bicep',
    'terraform',
    'docker',
    'git',
    'devops',
    'github',
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
      'The personal landing page and portfolio of your friendly neighborhood developer, Victor Frye.',
    siteName: 'VictorFrye.COM',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <DarkModeProvider>
            <ThemeProvider>
              <Profile>{children}</Profile>
            </ThemeProvider>
          </DarkModeProvider>
        </div>
      </body>
    </html>
  );
}
