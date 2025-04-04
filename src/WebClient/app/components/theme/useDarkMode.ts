import { useContext } from 'react';

import { DarkModeContext } from '@dotcom/components/theme/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
