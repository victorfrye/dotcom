'use client';

import * as React from 'react';

import {
  FluentProvider,
  makeStaticStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';

import useDarkMode from '@dotcom/theme/use-dark-mode';

const useStaticStyles = makeStaticStyles({
  html: {
    lineHeight: '1.15',
    '-webkit-text-size-adjust': '100%',
  },
  main: {
    display: 'block',
  },
  h1: {
    fontSize: '2em',
    margin: '0.67em 0',
  },
  p: {
    marginBlockStart: tokens.spacingVerticalXS,
    marginBlockEnd: tokens.spacingVerticalXS,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  b: {
    fontWeight: 'bolder',
  },
  strong: {
    fontWeight: 'bolder',
  },
  small: {
    fontSize: '80%',
  },
  pre: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  kbd: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  samp: {
    fontFamily: tokens.fontFamilyMonospace,
  },
});

export default function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useStaticStyles();
  const { isDark } = useDarkMode();

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      {children}
    </FluentProvider>
  );
}
