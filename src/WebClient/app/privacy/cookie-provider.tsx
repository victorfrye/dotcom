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

import { CookieSettings, useCookieSettings } from '@dotcom/privacy';
import { readValue } from '@dotcom/storage';

let initialized = false;

interface CookieContextProps {
  settings: CookieSettings | null;
  onSettingsChange: (settings: CookieSettings) => void;
}

export const CookieContext = createContext<CookieContextProps>({
  settings: readValue<CookieSettings>('cookies'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onSettingsChange: (_settings: CookieSettings) => {},
});

export default function CookieProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cookieSettings, handleCookieSettingsChange } = useCookieSettings();

  const handleSettingsChange = useCallback(
    (settings: CookieSettings) => {
      handleCookieSettingsChange(settings);

      try {
        sendGAEvent('consent', 'update', {
          ad_user_data: settings.enableAdvertising ? 'granted' : 'denied',
          ad_personalization: settings.enableAdvertising ? 'granted' : 'denied',
          ad_storage: settings.enableAdvertising ? 'granted' : 'denied',
          analytics_storage: settings.enableAnalytics ? 'granted' : 'denied',
        });
      } catch (error) {
        console.error('Error updating GA cookie consent settings:', error);
      }

      try {
        Clarity.consent(settings.enableAnalytics);
      } catch (error) {
        console.error('Error updating Clarity cookie consent settings:', error);
      }
    },
    [handleCookieSettingsChange]
  );

  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }

    sendGAEvent('consent', 'update', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });

    Clarity.init('rfkjulzalm');

    initialized = true;
  }, []);

  const cookies = useMemo(
    () => ({
      settings: cookieSettings,
      onSettingsChange: handleSettingsChange,
    }),
    [cookieSettings, handleSettingsChange]
  );

  return (
    <CookieContext.Provider value={cookies}>{children}</CookieContext.Provider>
  );
}
