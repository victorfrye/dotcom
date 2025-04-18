import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Profile } from '@dotcom/components/layout';
import { DarkModeProvider, ThemeProvider } from '@dotcom/components/theme';
import '@dotcom/globals.css';

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
  icons: ['images/profile.png'],
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

export const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
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
};

export default RootLayout;
