'use client';

import { ReactNode } from 'react';

import { ConsentProvider } from '@dotcom/privacy';
import { DarkModeProvider, ThemeProvider } from '@dotcom/theme';

interface ProviderTreeProps {
  children: ReactNode;
}

export default function ProviderTree({
  children,
}: Readonly<ProviderTreeProps>) {
  return (
    <ConsentProvider>
      <DarkModeProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </DarkModeProvider>
    </ConsentProvider>
  );
}
