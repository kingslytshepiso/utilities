/**
 * Mock for expo/src/winter/runtime.native
 * This prevents "import outside of test scope" errors for Expo Winter runtime
 */
module.exports = {
  installGlobals: jest.fn(),
};

