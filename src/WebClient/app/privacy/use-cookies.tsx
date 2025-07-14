'use client';

import { useContext } from 'react';

import { CookieContext } from '@dotcom/privacy/cookie-provider';

export default function useCookies() {
  return useContext(CookieContext);
}
