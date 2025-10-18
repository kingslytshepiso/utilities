// Jest setup file
// Note: @testing-library/react-native v12.4+ has built-in matchers

// Silence console in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};
