'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  initializeDarkMode,
  useThemeMediaQuery,
  useThemePreferences,
} from '@dotcom/theme';

interface DarkModeContextProps {
  isDark: boolean;
  onDarkModeToggle: (isDark: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextProps>({
  isDark: initializeDarkMode(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onDarkModeToggle: (_isDark: boolean) => {},
});

export default function DarkModeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { themePreferences, handleThemePreferencesChange } =
    useThemePreferences();
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
