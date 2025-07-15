'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { SwitchOnChangeData } from '@fluentui/react-components';

import CookieSettings from '@dotcom/privacy/cookie-settings';
import useCookies from '@dotcom/privacy/use-cookies';

export default function useCookieConsentState() {
  const { settings, onConsentChange } = useCookies();

  const [showFab, setShowFab] = useState(true);
  const [consentDialogOpen, setConsentDialogOpen] = useState(false);
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    settings?.enableAnalytics ?? true
  );
  const [advertisingEnabled, setAdvertisingEnabled] = useState(
    settings?.enableAdvertising ?? true
  );

  useEffect(() => {
    if (!settings) {
      setShowFab(false);
      setConsentDialogOpen(true);
    }
  }, [settings]);

  const handleCookieConsentChange = (cookies: CookieSettings) => {
    onConsentChange(cookies);
  };

  const handleAcceptAllClick = () => {
    handleCookieConsentChange({
      enableAnalytics: true,
      enableAdvertising: true,
    });

    setConsentDialogOpen(false);
    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleRejectAllClick = () => {
    handleCookieConsentChange({
      enableAnalytics: false,
      enableAdvertising: false,
    });

    setConsentDialogOpen(false);
    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleManageCookiesClick = () => {
    setConsentDialogOpen(false);
    setManagerDialogOpen(true);
  };

  const handleSaveSettingsClick = () => {
    handleCookieConsentChange({
      enableAnalytics: analyticsEnabled,
      enableAdvertising: advertisingEnabled,
    });

    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleAnalyticsToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAnalyticsEnabled(data.checked);
  };

  const handleAdvertisingToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAdvertisingEnabled(data.checked);
  };

  const handleFabClick = () => {
    setShowFab(false);

    setManagerDialogOpen(true);
  };

  return {
    showFab,
    consentDialogOpen,
    managerDialogOpen,
    analyticsEnabled,
    advertisingEnabled,
    handleAcceptAllClick,
    handleRejectAllClick,
    handleManageCookiesClick,
    handleSaveSettingsClick,
    handleAnalyticsToggle,
    handleAdvertisingToggle,
    handleFabClick,
  };
}
