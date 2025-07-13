import { readValue } from '@dotcom/storage';
import { ThemePreferences } from '@dotcom/theme';

export default function initializeDarkMode() {
  if (typeof window === 'undefined') {
    return false;
  }

  const userPrefersDark = readValue<ThemePreferences>('theme');

  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return userPrefersDark?.enableDarkMode ?? systemPrefersDark;
}
