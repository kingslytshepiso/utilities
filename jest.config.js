module.exports = {
  preset: "jest-expo",
  automock: false,
  resetMocks: false,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@supabase/.*)",
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/.expo/**",
    "!**/dist/**",
    "!**/scripts/**",
    "!**/__tests__/**",
    "!**/__mocks__/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^expo-secure-store$": "<rootDir>/__mocks__/expo-secure-store.js",
    "^expo-web-browser$": "<rootDir>/__mocks__/expo-web-browser.js",
    "^expo-constants$": "<rootDir>/__mocks__/expo-constants.js",
    "^expo$": "<rootDir>/__mocks__/expo.js",
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
};
