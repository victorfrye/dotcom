'use client';

import CookieButton from '@dotcom/privacy/cookie-button';
import CookieConsentDialog from '@dotcom/privacy/cookie-consent-dialog';
import CookieManagerDialog from '@dotcom/privacy/cookie-manager-dialog';
import useCookieConsentState from '@dotcom/privacy/use-cookie-consent-state';

export default function CookieBanner() {
  const {
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
  } = useCookieConsentState();

  return (
    <div>
      {showFab && <CookieButton onClick={handleFabClick} />}

      <div>
        <CookieConsentDialog
          open={consentDialogOpen}
          onAcceptAll={handleAcceptAllClick}
          onRejectAll={handleRejectAllClick}
          onManageCookies={handleManageCookiesClick}
        />
      </div>

      <div>
        <CookieManagerDialog
          open={managerDialogOpen}
          onAcceptAll={handleAcceptAllClick}
          onRejectAll={handleRejectAllClick}
          onSaveSettings={handleSaveSettingsClick}
          advertisingEnabled={advertisingEnabled}
          analyticsEnabled={analyticsEnabled}
          onAdvertisingToggle={handleAdvertisingToggle}
          onAnalyticsToggle={handleAnalyticsToggle}
        />
      </div>
    </div>
  );
}
