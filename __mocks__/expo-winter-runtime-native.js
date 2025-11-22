/**
 * Mock for expo/src/winter/runtime.native
 * This prevents "import outside of test scope" errors for Expo Winter runtime
 * Must export the same structure as the real module to prevent import errors
 */
module.exports = {
  __esModule: true,
  default: {
    installGlobals: jest.fn(),
  },
  installGlobals: jest.fn(),
};

