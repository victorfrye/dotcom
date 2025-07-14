import { ChangeEvent, useEffect, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Link,
  Subtitle2,
  Switch,
  SwitchOnChangeData,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Cookies32Regular } from '@fluentui/react-icons';

import { CookieSettings, useCookies } from '@dotcom/privacy';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    right: tokens.spacingHorizontalL,
    bottom: tokens.spacingVerticalL,
    zIndex: 1000,
  },
  banner: {
    position: 'fixed',
    left: 'auto',
    top: 'auto',
    right: tokens.spacingHorizontalXL,
    bottom: tokens.spacingVerticalXL,
    '@media screen and (max-width: 576px)': {
      left: tokens.spacingHorizontalXL,
    },
    zIndex: 1001,
  },
  section: {
    marginBlock: tokens.spacingVerticalXS,
  },
  consent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function CookieBanner() {
  const styles = useStyles();
  const [showFab, setShowFab] = useState(true);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [cookieManagerOpen, setCookieManagerOpen] = useState(false);

  const { settings, onSettingsChange } = useCookies();

  const [analyticalCookiesEnabled, setAnalyticalCookiesEnabled] = useState(
    settings?.enableAnalytics ?? true
  );
  const [advertisingCookiesEnabled, setAdvertisingCookiesEnabled] = useState(
    settings?.enableAdvertising ?? true
  );

  const privacyLinkRef = useRef<HTMLAnchorElement>(null);

  const handleCookieConsentChange = (cookies: CookieSettings) => {
    onSettingsChange(cookies);
  };

  const handleAcceptAllButtonClick = () => {
    handleCookieConsentChange({
      enableAnalytics: true,
      enableAdvertising: true,
    });

    setCookieBannerOpen(false);
    setCookieManagerOpen(false);

    setShowFab(true);
  };

  const handleManageCookiesButtonClick = () => {
    setCookieBannerOpen(false);
    setCookieManagerOpen(true);
  };

  const handleSaveSettingsButtonClick = () => {
    handleCookieConsentChange({
      enableAnalytics: analyticalCookiesEnabled,
      enableAdvertising: advertisingCookiesEnabled,
    });

    setCookieManagerOpen(false);

    setShowFab(true);
  };

  const handleAnalyticalCookiesToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAnalyticalCookiesEnabled(data.checked);
  };

  const handleAdvertisingCookiesToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    setAdvertisingCookiesEnabled(data.checked);
  };

  const handleFabClick = () => {
    setShowFab(false);

    setCookieManagerOpen(true);
  };

  useEffect(() => {
    if (!settings) {
      setShowFab(false);
      setCookieBannerOpen(true);
    }
  }, [settings]);

  return (
    <div>
      {showFab && (
        <Button
          icon={<Cookies32Regular />}
          as="button"
          shape="circular"
          appearance="outline"
          size="large"
          className={styles.fab}
          onClick={handleFabClick}
        />
      )}

      <Dialog open={cookieBannerOpen} modalType="non-modal">
        <DialogSurface className={styles.banner}>
          <DialogBody>
            <DialogTitle action={null}>We value your privacy</DialogTitle>
            <DialogContent>
              This website uses cookies to enhance your user experience and
              analyze performance and traffic on our website. By clicking{' '}
              <Text weight="bold">Accept All</Text>, you consent to our use of
              cookies and{' '}
              <Link href={'/privacy'} ref={privacyLinkRef}>
                Privacy Policy
              </Link>
              .
            </DialogContent>
            <DialogActions>
              <Button onClick={handleManageCookiesButtonClick}>
                Manage Cookies
              </Button>
              <Button appearance="primary" onClick={handleAcceptAllButtonClick}>
                Accept All
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Dialog open={cookieManagerOpen} modalType="modal">
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Manage your cookie settings</DialogTitle>
            <DialogContent>
              This website uses cookies to enhance your user experience and
              analyze performance and traffic on our website. You will find
              detailed information about each cookie consent category below. To
              learn more about our use of cookies and your privacy rights,
              please visit our{' '}
              <Link href={'/privacy'} ref={privacyLinkRef}>
                Privacy Policy
              </Link>
              .
              <div className={styles.section}>
                <div className={styles.consent}>
                  <Subtitle2>Necessary</Subtitle2>
                  <Switch checked disabled />
                </div>
                Necessary cookies are essential for us to operate this website,
                including providing a secure log in or adjusting consent
                preferences. These cookies do not store any personal information
                and cannot be disabled.
              </div>
              <div className={styles.section}>
                <div className={styles.consent}>
                  <Subtitle2>Functional</Subtitle2>
                  <Switch checked disabled />
                </div>
                Functional cookies help us perform certain functions like
                sharing the content of the website on social media platforms,
                collecting feedback, and other third-party features. These
                cookies do not store any personal information and cannot be
                disabled.
              </div>
              <div className={styles.section}>
                <div className={styles.consent}>
                  <Subtitle2>Analytical</Subtitle2>
                  <Switch
                    checked={analyticalCookiesEnabled}
                    onChange={handleAnalyticalCookiesToggle}
                  />
                </div>
                Analytical cookies help us understand how our visitors use the
                website and to monitor website performance. These cookies allow
                us to improve the website experience with evidence-based
                insights. Disabling these cookies may result in a less optimized
                experience.
              </div>
              <div className={styles.section}>
                <div className={styles.consent}>
                  <Subtitle2>Advertising</Subtitle2>
                  <Switch
                    checked={advertisingCookiesEnabled}
                    onChange={handleAdvertisingCookiesToggle}
                  />
                </div>
                Advertising cookies are used to deliver advertisements that are
                relevant to you and your interests. These cookies track your
                browsing habits and may share that information with third
                parties. You can disable these cookies for less personalized
                advertising.
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSaveSettingsButtonClick}>
                Save Settings
              </Button>
              <Button appearance="primary" onClick={handleAcceptAllButtonClick}>
                Accept All
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
