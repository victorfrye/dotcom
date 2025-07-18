'use client';

import { ChangeEvent } from 'react';

import CookieConsentRow from './cookie-consent-row';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  SwitchOnChangeData,
} from '@fluentui/react-components';

import CookieText from '@dotcom/cookies/cookie-text';

interface CookieManagerDialogProps {
  open: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSaveSettings: () => void;
  advertisingEnabled: boolean;
  analyticsEnabled: boolean;
  onAdvertisingToggle: (
    event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => void;
  onAnalyticsToggle: (
    event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => void;
}

export default function CookieManagerDialog({
  open,
  onAcceptAll,
  onRejectAll,
  onSaveSettings,
  advertisingEnabled,
  analyticsEnabled,
  onAdvertisingToggle,
  onAnalyticsToggle,
}: Readonly<CookieManagerDialogProps>) {
  const consentRows = [
    {
      title: CookieText.consentRow.necessary.title,
      description: CookieText.consentRow.necessary.description,
      checked: true,
      disabled: true,
    },
    {
      title: CookieText.consentRow.analytics.title,
      description: CookieText.consentRow.analytics.description,
      checked: analyticsEnabled,
      onChange: onAnalyticsToggle,
    },
    {
      title: CookieText.consentRow.advertising.title,
      description: CookieText.consentRow.advertising.description,
      checked: advertisingEnabled,
      onChange: onAdvertisingToggle,
    },
  ];

  return (
    <Dialog open={open} modalType="modal">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{CookieText.managerDialog.title}</DialogTitle>
          <DialogContent>
            {CookieText.managerDialog.body}

            {consentRows.map((row, index) => (
              <CookieConsentRow
                key={index}
                title={row.title}
                description={row.description}
                checked={row.checked}
                onChange={row.onChange}
                disabled={row.disabled}
              />
            ))}
          </DialogContent>
          <DialogActions fluid>
            <Button appearance="primary" onClick={onAcceptAll}>
              {CookieText.buttons.acceptAll}
            </Button>
            <Button appearance="primary" onClick={onRejectAll}>
              {CookieText.buttons.rejectAll}
            </Button>
            <Button onClick={onSaveSettings}>
              {CookieText.buttons.saveSettings}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
