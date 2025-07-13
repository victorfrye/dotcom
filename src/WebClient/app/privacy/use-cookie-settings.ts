'use client';

import { CookieSettings } from '@dotcom/privacy';
import { useLocalStorage } from '@dotcom/storage';

export default function useCookieSettings() {
  const { value, handleValueChange } =
    useLocalStorage<CookieSettings>('cookies');

  return {
    cookieSettings: value,
    handleCookieSettingsChange: handleValueChange,
  };
}
