import { useContext } from 'react';

import { DarkModeContext } from '@dotcom/lib/theme/DarkMode';

export default function useDarkMode() {
  return useContext(DarkModeContext);
}
