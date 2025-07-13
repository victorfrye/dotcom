'use client';

import { useLocalStorage } from '@dotcom/storage';
import { ThemePreferences } from '@dotcom/theme';

export default function useThemePreferences() {
  const { value, handleValueChange } =
    useLocalStorage<ThemePreferences>('theme');

  return {
    themePreferences: value,
    handleThemePreferencesChange: handleValueChange,
  };
}
