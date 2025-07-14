import { ReactNode } from 'react';

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
        <ThemeProvider>{children}</ThemeProvider>
      </DarkModeProvider>
    </CookieProvider>
  );
}
