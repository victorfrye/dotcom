'use client';

interface ConsentChangeData {
  analytics: boolean;
  advertising: boolean;
}

export default function useGA() {
  const handleConsentChange = (consent: ConsentChangeData) => {
    window.gtag('consent', 'update', {
      ad_storage: consent.advertising ? 'granted' : 'denied',
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_user_data: consent.advertising ? 'granted' : 'denied',
      ad_personalization: consent.advertising ? 'granted' : 'denied',
    });
  };

  return { handleConsentChange };
}
