import { useContext } from 'react';

import { DarkModeContext } from '@dotcom/lib/theme/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
