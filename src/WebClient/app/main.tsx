import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@dotcom/App';
import '@dotcom/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
