'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import CookieText from '@dotcom/privacy/cookie-text';

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

interface CookieConsentDialogProps {
  open: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManageCookies: () => void;
}

export default function CookieConsentDialog({
  open,
  onAcceptAll,
  onRejectAll,
  onManageCookies,
}: Readonly<CookieConsentDialogProps>) {
  const styles = useStyles();

  return (
    <div>
      <Dialog open={open} modalType="non-modal">
        <DialogSurface className={styles.banner}>
          <DialogBody>
            <DialogTitle action={null}>
              {CookieText.consentDialog.title}
            </DialogTitle>
            <DialogContent>{CookieText.consentDialog.body}</DialogContent>
            <DialogActions>
              <Button onClick={onRejectAll}>
                {CookieText.buttons.rejectAll}
              </Button>
              <Button onClick={onManageCookies}>
                {CookieText.buttons.manageCookies}
              </Button>
              <Button appearance="primary" onClick={onAcceptAll}>
                {CookieText.buttons.acceptAll}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
