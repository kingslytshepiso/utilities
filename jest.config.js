/* eslint-env node */
/* global __dirname */
const path = require("path");

const sharedRoot = path.join(__dirname, "packages", "shared");
const sharedCoreSrc = path.join(sharedRoot, "core", "src");
const sharedAuthSrc = path.join(sharedRoot, "auth", "src");
const toPosix = (value) => value.split(path.sep).join("/");

module.exports = {
  rootDir: __dirname,
  roots: [
    "<rootDir>/packages/basic",
    "<rootDir>/packages/auth",
    // "<rootDir>/packages/full", // Excluded - see testPathIgnorePatterns
    sharedCoreSrc,
    sharedAuthSrc,
  ],
  preset: "jest-expo",
  setupFiles: [path.join(__dirname, "packages/shared/jest-setup-before.js")],
  setupFilesAfterEnv: [path.join(__dirname, "jest.setup.js")],
  // Add module directories to help Jest find mocks
  // Mocks are now in root __mocks__ directory for all packages to use
  moduleDirectories: ["node_modules", "<rootDir>/__mocks__"],
  // Explicitly define testMatch pattern to help IDE extensions discover nested __tests__ directories
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test-utils\\.tsx$",
    "/packages/full/", // Ignore all tests in the full package
  ],
  transformIgnorePatterns: [
    // Updated pattern per external AI recommendation for Jest 30 + Expo Winter runtime
    // Include expo, react-native, and related packages in transform
    "node_modules[/\\\\](?!(expo|react-native|@react-native|@react-navigation|victory-native|victory-[^/\\\\]+|react-native-svg|expo-modules-core|@expo[\\\\/]vector-icons|jest-)?react-native)",
  ],
  // Allow imports from expo modules to prevent scope errors
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  resolver: path.join(__dirname, "jest-resolver.cjs"),
  moduleNameMapper: {
    // Mock Expo Winter runtime to prevent import errors (Jest 30 + Expo Winter runtime fix)
    // Mocks are in root __mocks__ directory so all packages can use them
    "^expo-winter-runtime$": "<rootDir>/__mocks__/expo-winter-runtime.js",
    "^expo/src/winter/runtime\\.native$":
      "<rootDir>/__mocks__/expo-winter-runtime-native.js",
    // Mock expo/build/winter - required for Jest 30 compatibility
    "^expo/build/winter$": "<rootDir>/__mocks__/expo-build-winter.js",
    // @/ paths: Map to auth package first (most common case for failing tests)
    // The custom resolver will handle dynamic resolution based on test file location
    // This fallback ensures jest.mock() calls work
    "^@/(.*)$": `${toPosix(path.join(__dirname, "packages", "auth"))}/$1`,
    // Additional mappings for template packages
    "^packages/auth/(.*)$": "<rootDir>/packages/auth/$1",
    "^packages/full/(.*)$": "<rootDir>/packages/full/$1",
    "^packages/basic/(.*)$": "<rootDir>/packages/basic/$1",
    // Shared package imports used by template packages
    "^@utilities/shared-core$": `${toPosix(sharedCoreSrc)}/index.ts`,
    "^@utilities/shared-core/(.*)$": `${toPosix(sharedCoreSrc)}/$1`,
    "^@utilities/shared-auth$": `${toPosix(sharedAuthSrc)}/index.ts`,
    "^@utilities/shared-auth/(.*)$": `${toPosix(sharedAuthSrc)}/$1`,
  },
  collectCoverageFrom: [
    "<rootDir>/packages/shared/core/src/**/*.{ts,tsx}",
    "!<rootDir>/packages/shared/core/src/**/*.d.ts",
    "!<rootDir>/packages/shared/core/src/**/*.test.{ts,tsx}",
    "!<rootDir>/packages/shared/core/src/**/*.spec.{ts,tsx}",
    "<rootDir>/packages/shared/auth/src/**/*.{ts,tsx}",
    "!<rootDir>/packages/shared/auth/src/**/*.d.ts",
    "!<rootDir>/packages/shared/auth/src/**/*.test.{ts,tsx}",
    "!<rootDir>/packages/shared/auth/src/**/*.spec.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  testEnvironment: "jsdom",
};
