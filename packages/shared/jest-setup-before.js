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
// CRITICAL: These must be defined BEFORE expo modules load
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = class TextDecoder {
    constructor() {
      this.decode = jest.fn((input) => String(input));
    }
  };
}

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = class TextEncoder {
    constructor() {
      this.encode = jest.fn(
        (input) => new Uint8Array(Buffer.from(String(input)))
      );
    }
  };
}

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
jest.mock("expo-winter-runtime", () => ({}));
// Mock the entire expo/src/winter directory to prevent sub-module imports
jest.mock(
  "expo/src/winter/runtime.native",
  () => ({
    __esModule: true,
    default: {
      installGlobals: jest.fn(),
    },
    installGlobals: jest.fn(),
  }),
  { virtual: true }
);
// Mock expo/src/winter sub-modules
jest.mock(
  "expo/src/winter/TextDecoder",
  () => ({
    TextDecoder: global.TextDecoder || class TextDecoder {},
  }),
  { virtual: true }
);
jest.mock(
  "expo/src/winter/TextDecoderStream",
  () => ({
    TextDecoderStream: global.TextDecoderStream || class TextDecoderStream {},
    TextEncoderStream: global.TextEncoderStream || class TextEncoderStream {},
  }),
  { virtual: true }
);
// Mock installGlobal to prevent it from trying to require sub-modules
jest.mock(
  "expo/src/winter/installGlobal",
  () => ({
    installGlobal: jest.fn((name, factory) => {
      // Silently install globals without requiring sub-modules
      if (typeof global[name] === "undefined") {
        global[name] = factory();
      }
    }),
  }),
  { virtual: true }
);
jest.mock(
  "expo/src/winter/FormData",
  () => ({
    installFormDataPatch: jest.fn(),
  }),
  { virtual: true }
);
jest.mock(
  "expo/src/winter/url",
  () => ({
    URL: global.URL || class URL {},
    URLSearchParams: global.URLSearchParams || class URLSearchParams {},
  }),
  { virtual: true }
);
jest.mock("expo/build/winter", () => ({}));
