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
    handleAcceptClick,
    handleRejectClick,
    handleManageClick,
    handleSaveClick,
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
          onAccept={handleAcceptClick}
          onReject={handleRejectClick}
          onManage={handleManageClick}
        />
      </div>

      <div>
        <CookieManagerDialog
          open={managerDialogOpen}
          onAccept={handleAcceptClick}
          onReject={handleRejectClick}
          onSave={handleSaveClick}
          advertisingEnabled={advertisingEnabled}
          analyticsEnabled={analyticsEnabled}
          onAdvertisingToggle={handleAdvertisingToggle}
          onAnalyticsToggle={handleAnalyticsToggle}
        />
      </div>
    </div>
  );
}
