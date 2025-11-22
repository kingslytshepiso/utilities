// Setup file that runs BEFORE any modules are imported
// This prevents Expo Winter runtime from trying to import files outside test scope

/* eslint-env jest */
/* global jest, global */

// Use real timers by default to prevent hanging issues with async operations
// Individual tests can use fake timers if needed by calling jest.useFakeTimers() in their setup
// Real timers work better with waitFor, fireEvent.press, and other async testing utilities

// Set global Expo registry to prevent errors
global.__ExpoImportMetaRegistry = {};

// Mock global Web APIs that Expo Winter runtime tries to access
// These are needed because Jest's jsdom environment doesn't include all Web APIs
if (typeof global.TextDecoderStream === "undefined") {
  global.TextDecoderStream = class TextDecoderStream {
    constructor() {
      this.readable = { pipeTo: jest.fn() };
      this.writable = { write: jest.fn() };
    }
  };
}

if (typeof global.TextEncoderStream === "undefined") {
  global.TextEncoderStream = class TextEncoderStream {
    constructor() {
      this.readable = { pipeTo: jest.fn() };
      this.writable = { write: jest.fn() };
    }
  };
}

// Mock expo before it's imported
jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
}));

// Mock expo-winter-runtime before it's imported
// Note: Mock files are in root __mocks__/ directory and mapped via moduleNameMapper in jest.config.js
// These jest.mock() calls ensure early mocking, while moduleNameMapper ensures Jest finds the mock files
jest.mock("expo-winter-runtime");
jest.mock("expo/src/winter/runtime.native");
jest.mock("expo/build/winter");


