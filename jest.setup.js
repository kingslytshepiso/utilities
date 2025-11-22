/* eslint-env jest */
/* global jest, beforeAll, afterAll */
// Compose shared and root helpers so every workspace consumes the same mocks
require("./packages/shared/jest.setup.js");

jest.mock("@utilities/shared-core/contexts/theme-context", () => {
  const { lightTheme } = jest.requireActual(
    "@utilities/shared-core/constants/theme"
  );

  return {
    ThemeProvider: ({ children }) => children,
    useTheme: () => ({
      theme: lightTheme,
      colorScheme: "light",
      themeMode: "light",
      toggleTheme: jest.fn(),
      setThemeMode: jest.fn(),
      isDark: false,
    }),
    usePaperTheme: () => lightTheme,
    useColorScheme: () => "light",
    useIsDarkMode: () => false,
  };
});

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("not wrapped in act(...)")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
