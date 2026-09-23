import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

import * as Sentry from "@sentry/react";

// Initialize Sentry BEFORE rendering React
Sentry.init({
  dsn: "https://4eb4bf75591cb2c4ffb9d4a813900621@o4511246012383232.ingest.de.sentry.io/4511246026276944", // replace with your actual DSN
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);