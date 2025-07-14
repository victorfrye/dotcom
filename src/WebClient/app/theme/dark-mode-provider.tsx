'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { readValue, useLocalStorage } from '@dotcom/storage';
import { ThemePreferences, useThemeMediaQuery } from '@dotcom/theme';

function initDarkMode() {
  if (typeof window === 'undefined') {
    return false;
  }

  const userPrefersDark = readValue<ThemePreferences>('theme');

  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return userPrefersDark?.enableDarkMode ?? systemPrefersDark;
}

interface DarkModeContextProps {
  isDark: boolean;
  onDarkModeToggle: (isDark: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextProps>({
  isDark: initDarkMode(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onDarkModeToggle: (_isDark: boolean) => {},
});

interface DarkModeProviderProps {
  children: ReactNode;
}

export default function DarkModeProvider({
  children,
}: Readonly<DarkModeProviderProps>) {
  const {
    value: themePreferences,
    handleValueChange: handleThemePreferencesChange,
  } = useLocalStorage<ThemePreferences>('theme');
  const systemPrefersDark = useThemeMediaQuery();

  const [isDark, setIsDark] = useState<boolean>(
    themePreferences?.enableDarkMode ?? systemPrefersDark
  );

  const handleDarkModeToggle = useCallback(
    (prefersDark: boolean) => {
      handleThemePreferencesChange({
        ...themePreferences,
        enableDarkMode: prefersDark,
      });
      setIsDark(prefersDark);
    },
    [handleThemePreferencesChange, themePreferences]
  );

  const darkMode = useMemo(
    () => ({
      isDark,
      onDarkModeToggle: handleDarkModeToggle,
    }),
    [isDark, handleDarkModeToggle]
  );

  useEffect(() => {
    if (themePreferences?.enableDarkMode !== undefined) {
      return;
    }

    setIsDark(systemPrefersDark);
  }, [themePreferences, systemPrefersDark]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}
