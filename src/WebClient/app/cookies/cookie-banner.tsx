'use client';

import CookieButton from '@dotcom/cookies/cookie-button';
import CookieConsentDialog from '@dotcom/cookies/cookie-consent-dialog';
import CookieManagerDialog from '@dotcom/cookies/cookie-manager-dialog';
import useCookieBanner from '@dotcom/cookies/use-cookie-banner';

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
  } = useCookieBanner();

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
