'use client';

import { ReactNode } from 'react';

import Frame from '@dotcom/frame';
import { CookieProvider } from '@dotcom/privacy';
import { DarkModeProvider, ThemeProvider } from '@dotcom/theme';

interface ProviderTreeProps {
  children: ReactNode;
}

export default function ProviderTree({
  children,
}: Readonly<ProviderTreeProps>) {
  return (
    <CookieProvider>
      <DarkModeProvider>
        <ThemeProvider>
          <Frame>{children}</Frame>
        </ThemeProvider>
      </DarkModeProvider>
    </CookieProvider>
  );
}
