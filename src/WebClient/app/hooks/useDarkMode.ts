import { useContext } from 'react';

import { DarkModeContext } from '@dotcom/providers/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
