import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

// Provide no-op alert for components that call alert()
// @ts-ignore
globalThis.alert = () => {};

// Basic clipboard mock for tests that copy code
// @ts-ignore
if (!globalThis.navigator.clipboard) {
  // @ts-ignore
  globalThis.navigator.clipboard = { writeText: async () => {} };
}