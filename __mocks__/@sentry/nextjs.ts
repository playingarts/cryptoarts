/* eslint-disable no-undef */
// Mock for @sentry/nextjs
export const withScope = jest.fn((callback) =>
  callback({ setExtra: jest.fn(), setTag: jest.fn() })
);
export const captureException = jest.fn();
export const captureMessage = jest.fn();
export const init = jest.fn();
export const setUser = jest.fn();
export const setTag = jest.fn();
export const setExtra = jest.fn();
export const addBreadcrumb = jest.fn();
