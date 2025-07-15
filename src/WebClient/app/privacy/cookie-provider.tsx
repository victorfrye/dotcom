'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import Clarity from '@microsoft/clarity';
import { sendGAEvent } from '@next/third-parties/google';

import CookieSettings from '@dotcom/privacy/cookie-settings';
import { readValue, useLocalStorage } from '@dotcom/storage';

let initialized = false;

interface CookieContextProps {
  settings: CookieSettings | null;
  onConsentChange: (settings: CookieSettings) => void;
}

export const CookieContext = createContext<CookieContextProps>({
  settings: readValue<CookieSettings>('cookies'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onConsentChange: (_settings: CookieSettings) => {},
});

interface CookieProviderProps {
  children: ReactNode;
}

export default function CookieProvider({ children }: CookieProviderProps) {
  const {
    value: cookieSettings,
    handleValueChange: handleCookieSettingsChange,
  } = useLocalStorage<CookieSettings>('cookies');

  const handleGAConsentChange = useCallback(
    (settings: CookieSettings) =>
      sendGAEvent('consent', 'update', {
        ad_user_data: settings.enableAdvertising ? 'granted' : 'denied',
        ad_personalization: settings.enableAdvertising ? 'granted' : 'denied',
        ad_storage: settings.enableAdvertising ? 'granted' : 'denied',
        analytics_storage: settings.enableAnalytics ? 'granted' : 'denied',
      }),
    []
  );

  const handleClarityConsentChange = useCallback(
    (settings: CookieSettings) => Clarity.consent(settings.enableAnalytics),
    []
  );

  const handleConsentChange = useCallback(
    (settings: CookieSettings) => {
      handleCookieSettingsChange(settings);

      try {
        handleGAConsentChange(settings);
      } catch (error) {
        console.error('Error updating GA cookie consent settings:', error);
      }

      try {
        handleClarityConsentChange(settings);
      } catch (error) {
        console.error('Error updating Clarity cookie consent settings:', error);
      }
    },
    [
      handleClarityConsentChange,
      handleCookieSettingsChange,
      handleGAConsentChange,
    ]
  );

  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }

    Clarity.init('rfkjulzalm');

    if (cookieSettings) {
      handleGAConsentChange(cookieSettings);
      handleClarityConsentChange(cookieSettings);
    } else {
      // If no previous cookie settings are found, set default consent.
      handleGAConsentChange({
        enableAdvertising: false,
        enableAnalytics: false,
      });
    }

    initialized = true;
  }, [cookieSettings, handleClarityConsentChange, handleGAConsentChange]);

  const cookies = useMemo(
    () => ({
      settings: cookieSettings,
      onConsentChange: handleConsentChange,
    }),
    [cookieSettings, handleConsentChange]
  );

  return (
    <CookieContext.Provider value={cookies}>{children}</CookieContext.Provider>
  );
}
