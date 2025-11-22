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
  // Explicitly define testMatch pattern to help IDE extensions discover nested __tests__ directories
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test-utils\\.tsx$",
    "/packages/full/", // Ignore all tests in the full package
  ],
  transformIgnorePatterns: [
    "node_modules[/\\\\](?!(jest-)?react-native|@react-native|@react-navigation|victory-native|victory-[^/\\\\]+|react-native-svg|expo-modules-core|expo|@expo[\\\\/]vector-icons)",
  ],
  resolver: path.join(__dirname, "jest-resolver.js"),
  moduleNameMapper: {
    // Mock Expo Winter runtime to prevent import errors
    "^expo-winter-runtime$": "<rootDir>/packages/shared/jest-setup-before.js",
    "^expo/src/winter/runtime.native$":
      "<rootDir>/packages/shared/jest-setup-before.js",
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
