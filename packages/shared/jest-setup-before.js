// Setup file that runs BEFORE any modules are imported
// This prevents Expo Winter runtime from trying to import files outside test scope

/* eslint-env jest */
/* global jest, global */

// Use real timers by default to prevent hanging issues with async operations
// Individual tests can use fake timers if needed by calling jest.useFakeTimers() in their setup
// Real timers work better with waitFor, fireEvent.press, and other async testing utilities

// Set global Expo registry to prevent errors
global.__ExpoImportMetaRegistry = {};

// Mock expo before it's imported
jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
}));

// Mock expo-winter-runtime before it's imported
jest.mock("expo-winter-runtime", () => ({}));


