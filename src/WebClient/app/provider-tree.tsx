'use client';

import { ReactNode } from 'react';

import { ConsentProvider } from '@dotcom/privacy';
import { ColorModeProvider, ThemeProvider } from '@dotcom/theme';

interface ProviderTreeProps {
  children: ReactNode;
}

export default function ProviderTree({
  children,
}: Readonly<ProviderTreeProps>) {
  return (
    <ConsentProvider>
      <ColorModeProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ColorModeProvider>
    </ConsentProvider>
  );
}
