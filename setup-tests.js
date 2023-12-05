import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import mswServer from './src/msw/server';

beforeAll(() => {
  mswServer.listen();
});
afterEach(() => {
  cleanup();
});

afterAll(() => {
  mswServer.resetHandlers();
  mswServer.close();
});
