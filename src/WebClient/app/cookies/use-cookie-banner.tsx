'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { SwitchOnChangeData } from '@fluentui/react-components';

import { ConsentSettings, useConsent } from '@dotcom/privacy';

export default function useCookieBanner() {
  const { consent: settings, onConsentChange } = useConsent();

  const [showFab, setShowFab] = useState(true);
  const [consentDialogOpen, setConsentDialogOpen] = useState(false);
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    settings?.analytics ?? true
  );
  const [advertisingEnabled, setAdvertisingEnabled] = useState(
    settings?.advertising ?? true
  );

  useEffect(() => {
    if (!settings) {
      setShowFab(false);
      setConsentDialogOpen(true);
    }
  }, [settings]);

  const handleCookieConsentChange = (cookies: ConsentSettings) => {
    setAnalyticsEnabled(cookies.analytics);
    setAdvertisingEnabled(cookies.advertising);

    onConsentChange(cookies);
  };

  const handleAcceptAllClick = () => {
    handleCookieConsentChange({
      analytics: true,
      advertising: true,
    });

    setConsentDialogOpen(false);
    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleRejectAllClick = () => {
    handleCookieConsentChange({
      analytics: false,
      advertising: false,
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
      analytics: analyticsEnabled,
      advertising: advertisingEnabled,
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
