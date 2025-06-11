import React from 'react';
import ReactDOM from 'react-dom/client';
import { startMockServiceWorker } from './mocks/browser';
import App from './App';

// Initialize MSW if enabled
startMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
