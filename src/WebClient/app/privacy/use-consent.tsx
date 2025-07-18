'use client';

import { useContext } from 'react';

import { ConsentContext } from '@dotcom/privacy/consent-provider';

export default function useConsent() {
  return useContext(ConsentContext);
}
