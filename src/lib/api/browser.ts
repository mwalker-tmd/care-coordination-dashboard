import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startMockServiceWorker = async () => {
  // Only start MSW if the feature flag is enabled
  if (import.meta.env.VITE_ENABLE_MOCK_API === 'true') {
    return worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    });
  }
  return Promise.resolve();
};
