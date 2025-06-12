import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../src/lib/api/handlers';

// Set up MSW server for all tests
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Add any global test setup here 