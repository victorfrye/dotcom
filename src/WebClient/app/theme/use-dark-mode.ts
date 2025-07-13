'use client';

import { useContext } from 'react';

import { DarkModeContext } from '@dotcom/theme/dark-mode-provider';

export default function useDarkMode() {
  return useContext(DarkModeContext);
}
