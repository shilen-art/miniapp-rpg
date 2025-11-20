import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import './app/global.css';
import './shared/i18n'; // важно: просто импорт, без использования

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

