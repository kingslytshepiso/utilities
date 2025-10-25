// Jest setup file - runs after the test environment is set up

// Mock Expo Winter ImportMetaRegistry to prevent import scope errors
// Reference: https://github.com/expo/expo/issues/...
jest.mock("expo/src/winter/ImportMetaRegistry", () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));

// Mock theme context to avoid async loading issues in tests
jest.mock("./contexts/theme-context", () => {
  const { lightTheme } = jest.requireActual("./constants/theme");
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

// Polyfill structuredClone for Jest environment
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
}

// Suppress act() warnings in tests - these are expected for async state updates in providers
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
