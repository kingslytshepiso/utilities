module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/test-utils\\.tsx$"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|victory-native|victory-[^/]+|react-native-svg|expo-modules-core|expo|@expo/vector-icons)",
  ],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@utilities/shared-core/(.*)$": "<rootDir>/../core/src/$1",
    "^@utilities/shared-auth/(.*)$": "<rootDir>/../auth/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  testEnvironment: "jsdom",
};

